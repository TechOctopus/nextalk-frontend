export type Channel = {
  id: string
  name: string
  isPrivate: boolean
  createdAt: string
  updatedAt?: string
  status: 'invite' | 'join' | 'revoke' | 'ban' | 'unban' | 'create'
}

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

export type Message = {
  user: User
  text: string
  stamp: string
  mentions: User[]
  createdAt: string
  updatedAt?: string
  typing?: boolean
}
