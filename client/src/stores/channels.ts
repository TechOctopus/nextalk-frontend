import { defineStore } from 'pinia'
import type { Channel } from 'src/contracts'
import { channelService } from 'src/services'
import { router } from 'src/router'

export const useChannelStore = defineStore('channels', {
  state: () => ({
    channels: [] as Channel[],
    active: null as Channel | null,
  }),

  getters: {
    joinedChannels: (state) => {
      return state.channels
    },

    getChannelByName: (state) => (name: string) => {
      return state.channels.find((c) => c.name === name)
    },
  },

  actions: {
    setCurrentChannel(channelName: string) {
      const channel = this.getChannelByName(channelName)
      if (!channel) {
        return
      }
      this.active = channel
    },

    resetCurrentChannel() {
      this.active = null
    },

    async loadChannels() {
      this.channels = await channelService.loadChannels()
    },

    async quitChannels() {
      await channelService.quitChannels(this.channels)
      this.channels = []
      this.active = null
    },

    newChannel(channel: Channel) {
      this.channels.push(channel)
    },

    removeChannel(channel: Channel) {
      const index = this.channels.findIndex((c) => c.id === channel.id)
      if (index !== -1) {
        this.channels.splice(index, 1)
      }

      if (this.active?.id === channel.id) {
        this.active = null
        router.push('/channels')
      }
    },

    async addChannel(channelName: string, isPrivate: boolean) {
      const newChannel = await channelService.addChannel(channelName, isPrivate)
      if (newChannel) {
        this.newChannel(newChannel)
      }
    },

    async inviteUser(userName: string, channelId: string) {
      await channelService.inviteUser(userName, channelId)
    },

    async revokeUser(userName: string, channelId: string) {
      await channelService.revokeUser(userName, channelId)
    },

    async quitChannel(channelId: string) {
      await channelService.quitChannel(channelId)
    },

    async cancelChannel(channelId: string) {
      await channelService.cancelChannel(channelId)
    },

    async kickUser(userName: string, channelId: string) {
      await channelService.kickUser(userName, channelId)
    },
  },
})
