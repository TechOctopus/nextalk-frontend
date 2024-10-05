export type Channel = {
  id: string
  name: string
  isPrivate: boolean
  createdAt: string
  updatedAt?: string
}

export type User = {
  id: string
  username: string
  firstName: string
  lastName: string
  email: string
  status: string
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
