import { useMessageStore } from 'src/stores/messages'
import { apiRequest } from 'src/utils/api'

import { Ws } from 'boot/ws'

class MessageService {
  private messagesStore = useMessageStore()
  private LIMIT = 15
  private socket = Ws.getSocket()

  constructor() {
    this.setupSocketListeners()
  }

  async load(channelId: string): Promise<boolean> {
    const response = await apiRequest(
      'GET',
      `/message/${channelId}?limit=${this.LIMIT}&offset=${this.messagesStore.getOffset(channelId)}`,
    )
    if (response.ok) {
      if (response.data.messages.length === 0) return true
      this.messagesStore.update(channelId, response.data.messages)
      return response.data.allMessagesLoaded
    }
    return false
  }

  async sendMessage(channelId: string, message: string) {
    const response = await apiRequest('POST', '/message/create', { text: message, channelId })
    if (!response.ok) {
      console.error('Failed to send message')
    }
  }

  private setupSocketListeners() {
    this.socket.on('message', (message) => {
      this.messagesStore.add(message.channelId, message.message)
    })
  }
}

export const messageService = new MessageService()
