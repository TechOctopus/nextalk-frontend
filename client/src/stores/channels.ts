import { defineStore } from 'pinia'
import type { Channel } from 'src/contracts'
import { channelService } from 'src/services'

export const useChannelStore = defineStore('channels', {
  state: () => ({
    channels: [] as Channel[],
    active: null as string | null,
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
    setCurrentChannel(channel: string) {
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

    async newChannel(channel: Channel) {
      this.channels.push(channel)
    },

    async addChannel(channelName: string, isPrivate: boolean) {
      const newChannel = await channelService.addChannel(channelName, isPrivate)
      if (newChannel) {
        this.newChannel(newChannel)
      }
    },
  },
})
