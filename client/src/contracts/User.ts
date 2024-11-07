export type UserStatus = 'online' | 'offline' | 'dnd'
export type UserNotification = 'enabled' | 'disabled' | 'mentions'

export type User = {
  id: string
  username: string
  firstName: string
  lastName: string
  email: string
  status: UserStatus
  notifications: UserNotification
  createdAt: string
  updatedAt?: string
}
