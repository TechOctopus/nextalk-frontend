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
    scrollArea: null as HTMLElement | null,
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
