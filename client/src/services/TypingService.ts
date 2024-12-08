import { User } from 'src/contracts'
import { SocketManager } from './SocketManager'
import { useMessageStore } from 'src/stores'

class TypingSocketManager extends SocketManager {
  public subscribe(): void {
    const channelName = this.namespace.split('/').pop() as string

    this.socket.on('typing', (user: User, text: string) => {
      useMessageStore().addTyping(channelName, user, text)
    })

    this.socket.on('stopTyping', (user: User) => {
      useMessageStore().removeTyping(channelName, user)
    })
  }

  public typing(text: string): void {
    this.socket.emit('typing', text)
  }

  public stopTyping(): void {
    this.socket.emit('stopTyping')
  }
}

class TypingService {
  private typingManager: TypingSocketManager | null = null

  public subscribe(channelName: string): void {
    this.typingManager = new TypingSocketManager(`/typing/${channelName}`)
  }

  public unsubscribe(): void {
    if (!this.typingManager) {
      return
    }
    this.typingManager.destroy()
  }

  public typing(text: string): void {
    if (!this.typingManager) {
      return
    }

    this.typingManager.typing(text)
  }

  public stopTyping(): void {
    if (!this.typingManager) {
      return
    }
    this.typingManager.stopTyping()
  }
}

export default new TypingService()
