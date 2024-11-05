import { defineStore } from 'pinia'
import { Message } from 'src/contracts'

export type Messages = {
  [channelId: string]: {
    messages: Message[]
    offset: number
  }
}

export const useMessageStore = defineStore('messages', {
  state: () => ({
    messages: {} as Messages,
    messagesRefs: [] as HTMLElement[],
  }),

  getters: {
    getMessages: (state) => (channelId: string) => {
      return state.messages[channelId]?.messages || []
    },

    getOffset: (state) => (channelId: string) => {
      return state.messages[channelId]?.offset || 0
    },
  },

  actions: {
    init(channelId: string) {
      this.messages[channelId] = {
        messages: [],
        offset: 0,
      }
    },

    add(channelId: string, message: Message) {
      if (!this.messages[channelId]) {
        this.init(channelId)
      }
      this.messages[channelId].messages.push(message)
    },

    update(channelId: string, messages: Message[]) {
      if (!this.messages[channelId]) {
        this.init(channelId)
      }
      this.messages[channelId].offset += messages.length
      this.messages[channelId].messages.unshift(...messages)
    },
  },
})
