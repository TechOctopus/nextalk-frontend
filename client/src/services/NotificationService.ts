import { SerializedMessage } from 'src/contracts'
import { AppVisibility } from 'quasar'
import { useAuthStore } from 'src/stores'

type NotificationPermission = 'default' | 'granted' | 'denied'

class NotificationService {
  private permission: NotificationPermission = Notification.permission

  private tryRequestPermission() {
    if (this.permission !== 'denied' && Notification.permission === 'default') {
      Notification.requestPermission().then((permission) => {
        this.permission = permission
        console.info('Notification permission', permission)
      })
    }
  }

  public notify(title: string, message: string) {
    if (this.permission === 'default') {
      this.tryRequestPermission()
    }

    if (this.permission === 'granted') {
      const notification = new Notification(title, {
        body: message,
        badge: '/favicon.ico',
        icon: '/favicon.ico',
      })
      console.info('Notification sent', notification)
    } else {
      console.info('Notification not sent', message)
    }
  }

  public notifyMessage(channelName: string, message: SerializedMessage) {
    if (!AppVisibility.appVisible && useAuthStore().user?.notifications !== 'disabled') {
      const authorName = `${message.author.firstName} ${message.author.lastName}`
      const isMentioned = message.content.includes(`@${useAuthStore().user?.username}`)
      const rawMessage = message.content.replace(/<strong.*?>/g, '').replace(/<\/strong>/g, '')
      const formattedMessage = rawMessage.length > 10 ? rawMessage.slice(0, 10) + '...' : rawMessage
      if (useAuthStore().user?.notifications === 'mentions' && !isMentioned) return
      this.notify(`New message in ${channelName}`, `${authorName}: ${formattedMessage}`)
    }
  }
}

export default new NotificationService()
