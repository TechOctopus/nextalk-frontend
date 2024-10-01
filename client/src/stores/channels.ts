import { defineStore } from 'pinia'
import type { Channel } from 'src/types'

const channels = [
  {
    id: '1',
    name: 'fiit',
    isPrivate: false,
    createdAt: '2024-10-01',
  },
  {
    id: '2',
    name: 'vpwa',
    isPrivate: false,
    createdAt: '2024-08-01',
  },
  {
    id: '3',
    name: 'nextalk',
    isPrivate: true,
    createdAt: '2024-09-01',
  },
] as Channel[]

export const useChannelStore = defineStore('channels', {
  state: () => ({
    channels,
    currentChannel: undefined as Channel | undefined,
  }),

  getters: {
    getChannelById: (state) => (name: string) => {
      return state.channels.find((channel) => channel.name === name)
    },
  },

  actions: {
    setCurrentChannel(channelName: string) {
      this.currentChannel = this.getChannelById(channelName)
    },

    resetCurrentChannel() {
      this.currentChannel = undefined
    },
  },
})
