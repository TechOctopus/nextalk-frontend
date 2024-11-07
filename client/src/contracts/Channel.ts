export type Channel = {
  id: string
  name: string
  isPrivate: boolean
  createdAt: string
  updatedAt?: string
  status: 'invite' | 'join' | 'revoke' | 'ban' | 'unban' | 'create'
}
