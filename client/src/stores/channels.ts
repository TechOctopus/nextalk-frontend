import { defineStore } from 'pinia'
import type { SerializedMessage, RawMessage } from 'src/contracts'
import { channelService } from 'src/services'

export const useChannelStore = defineStore('channels', {
  state: () => ({
    messages: {} as { [channel: string]: SerializedMessage[] },
    active: null as string | null,
  }),

  getters: {
    getChannelByName: (state) => (name: string) => {
      return name in state.messages
    },

    joinedChannels: (state) => {
      return Object.keys(state.messages)
    },

    currentMessages: (state) => {
      return state.active !== null ? state.messages[state.active] : []
    },

    lastMessageOf: (state) => {
      return (channel: string) => {
        const messages = state.messages[channel]
        return messages.length > 0 ? messages[messages.length - 1] : null
      }
    },
  },

  actions: {
    setCurrentChannel(channel: string) {
      this.active = channel
    },

    resetCurrentChannel() {
      this.active = null
    },

    async join(channel: string) {
      this.messages[channel] = await channelService.join(channel).loadMessages()
    },

    async leave(channel: string | null) {
      const leaving: string[] = channel !== null ? [channel] : this.joinedChannels

      leaving.forEach((c) => {
        channelService.leave(c)
      })
    },

    async newMessage(channel: string, message: SerializedMessage) {
      this.messages[channel].push(message)
    },

    async addMessage(channel: string, message: RawMessage) {
      const newMessage = await channelService.in(channel)?.addMessage(message)
      if (newMessage) {
        this.newMessage(channel, newMessage)
      }
    },
  },
})
