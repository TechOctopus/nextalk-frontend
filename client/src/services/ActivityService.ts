import { User, UserNotification } from 'src/contracts'
import { authManager } from '.'
import { SocketManager } from './SocketManager'

class ActivitySocketManager extends SocketManager {
  public subscribe(): void {
    this.socket.on('user:list', (onlineUsers: User[]) => {
      console.info('Online users list', onlineUsers)
    })

    this.socket.on('user:online', (user: User) => {
      console.info('User is online', user)
    })

    this.socket.on('user:offline', (user: User) => {
      console.info('User is offline', user)
    })

    authManager.onChange((token) => {
      if (token) {
        this.socket.connect()
      } else {
        this.socket.disconnect()
      }
    })
  }

  public updateNotificationSettings(notifications: UserNotification): Promise<void> {
    return this.emitAsync('userNotifications', notifications)
  }
}

export default new ActivitySocketManager('/')
