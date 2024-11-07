import { defineStore } from 'pinia'
import { SerializedMessage, RawMessage } from 'src/contracts'
import { channelService } from 'src/services'

export type Messages = {
  [channel: string]: SerializedMessage[]
}

export const useMessageStore = defineStore('messages', {
  state: () => ({
    messages: {} as Messages,
    messagesRefs: [] as HTMLElement[],
  }),

  getters: {
    getMessages: (state) => (channel: string) => {
      return state.messages[channel] || []
    },
  },

  actions: {
    async join(channel: string) {
      this.messages[channel] = await channelService.join(channel).loadMessages()
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
