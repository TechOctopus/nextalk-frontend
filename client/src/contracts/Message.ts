import { User } from './index'

export type Message = {
  user: User
  text: string
  stamp: string
  mentions: User[]
  createdAt: string
  updatedAt?: string
  typing?: boolean
}
