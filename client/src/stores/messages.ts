import { defineStore } from 'pinia'
import { SerializedMessage, RawMessage } from 'src/contracts'
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
      this.messages[channel].push(message)
    },

    async addMessage(channel: string, message: RawMessage) {
      const data = await channelService.in(channel)?.addMessage(message)
      if (!data) return
      this.newMessage(channel, data.message)
      if (data.isChannelJoined) {
        useChannelStore().changeChannelStatusToJoin(channel)
      }
    },
  },
})
