import { defineStore } from 'pinia'
import { Message } from 'src/types'
import { messagesFor1, messagesFor2, messagesFor3, user } from 'src/assets'

export type Messages = {
  [channelId: string]: {
    messages: Message[]
    offset: number
  }
}

export const useMessageStore = defineStore('messages', {
  state: () => ({
    messages: {
      '1': {
        messages: messagesFor1.slice(messagesFor1.length - 10),
        offset: 10,
      },
      '2': {
        messages: messagesFor2,
        offset: 0,
      },
      '3': {
        messages: messagesFor3,
        offset: 0,
      },
    } as Messages,
    messagesRefs: [] as HTMLElement[],
  }),

  getters: {
    getMessages: (state) => (channelId: string) => {
      return state.messages[channelId]?.messages || []
    },
  },

  actions: {
    // only for demonstration purposes of infinite scroll working
    loadMore(channelId: string): boolean {
      const messages = this.messages[channelId].messages
      const offset = this.messages[channelId].offset

      if (messagesFor1.length - offset - 10 <= 0) return true

      const newMessages = messagesFor1.slice(messagesFor1.length - 10 - offset, messagesFor1.length - offset)
      this.messages[channelId].messages = [...newMessages, ...messages]
      this.messages[channelId].offset += newMessages.length

      return false
    },

    sendMessage(channelId: string, message: string) {
      if (this.messages[channelId] === undefined) {
        this.messages[channelId] = {
          messages: [],
          offset: 0,
        }
      }

      this.messages[channelId].messages.push({
        user,
        text: message,
        stamp: new Date().toLocaleTimeString(),
        mentions: [],
        createdAt: new Date().toISOString(),
      })

      this.messages[channelId].messages.sort((a, b) => (a.typing === true ? 1 : b.typing === true ? -1 : 0))
    },
  },
})
