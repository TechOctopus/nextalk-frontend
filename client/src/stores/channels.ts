import { defineStore } from 'pinia'
import type { Channel } from 'src/contracts'

export const useChannelStore = defineStore('channels', {
  state: () => ({
    channels: [] as Channel[],
    currentChannel: undefined as Channel | undefined,
  }),

  getters: {
    getChannelByName: (state) => (name: string) => {
      return state.channels.find((channel) => channel.name === name)
    },
  },

  actions: {
    setCurrentChannel(channelName: string) {
      this.currentChannel = this.getChannelByName(channelName)
    },

    resetCurrentChannel() {
      this.currentChannel = undefined
    },

    addChannel(channel: Channel) {
      this.channels.push(channel)
    },

    initChannels(channels: Channel[]) {
      this.currentChannel = channels[0] || undefined
      this.channels = channels
    },

    removeChannel(channelId: string) {
      const index = this.channels.findIndex((channel) => channel.id === channelId)
      if (index !== -1) {
        this.channels.splice(index, 1)
      }
    },
  },
})
