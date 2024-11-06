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
      this.active = this.channels[0].name
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

    // async leave(channel: string | null) {
    // const leaving: string[] = channel !== null ? [channel] : this.joinedChannels
    // leaving.forEach((c) => {
    //   channelService.leave(c)
    // })
    // },
  },
})
