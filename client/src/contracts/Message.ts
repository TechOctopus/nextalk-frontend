import { User } from './index'

export type RawMessage = string

export interface SerializedMessage {
  id: number
  author: User
  content: string
  mentions: User[]
  createdAt: string
  updatedAt: string
  typing?: boolean
}
