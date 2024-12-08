import { defineStore } from 'pinia'
import { SerializedMessage, RawMessage, User } from 'src/contracts'
import { channelService } from 'src/services'
import { useChannelStore } from 'src/stores/channels'

export type Messages = {
  [channel: string]: SerializedMessage[]
}

export const useMessageStore = defineStore('messages', {
  state: () => ({
    messages: {} as Messages,
    offsets: {} as { [channel: string]: number },
    scrollArea: null as HTMLElement | null,
  }),

  getters: {
    getMessages: (state) => (channel: string) => {
      return state.messages[channel] || []
    },
  },

  actions: {
    async join(channel: string) {
      const messages = await channelService.join(channel).loadMessages(0)
      this.messages[channel] = messages
      this.offsets[channel] = messages.length || 0
    },

    async loadMore(channel: string): Promise<boolean> {
      const messages = await channelService.in(channel)?.loadMessages(this.offsets[channel])
      if (!messages) return true
      this.messages[channel].unshift(...messages)
      this.offsets[channel] += messages.length
      return messages.length === 0
    },

    async leave(channel: string) {
      delete this.messages[channel]
      channelService.leave(channel)
    },

    async newMessage(channel: string, message: SerializedMessage) {
      const typingMessages = this.messages[channel].filter((msg) => msg.typing)
      this.messages[channel] = this.messages[channel].filter((msg) => !msg.typing)

      this.messages[channel].push(message)
      this.messages[channel].push(...typingMessages)
    },

    async addMessage(channel: string, message: RawMessage) {
      const data = await channelService.in(channel)?.addMessage(message)
      if (!data) return
      this.newMessage(channel, data.message)
      if (data.isChannelJoined) {
        useChannelStore().changeChannelStatusToJoin(channel)
      }
    },

    addTyping(channelName: string, user: User, text: string) {
      const typeMessageId = parseInt(user.id) * -1
      const typingMessage: SerializedMessage = {
        id: typeMessageId,
        author: user,
        content: text,
        mentions: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        typing: true,
      }

      // update if already exists
      this.messages[channelName] = this.messages[channelName].filter((msg) => msg.id !== typeMessageId)
      this.messages[channelName].push(typingMessage)
    },

    removeTyping(channelName: string, user: User) {
      const typeMessageId = parseInt(user.id) * -1
      this.messages[channelName] = this.messages[channelName].filter((msg) => msg.id !== typeMessageId)
    },
  },
})
