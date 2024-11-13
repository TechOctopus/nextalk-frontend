// Data for preview purposes
import { User } from 'src/contracts'

export const members = [
  {
    id: '3',
    username: 'johnny',
    firstName: 'John',
    lastName: 'Doe',
    email: 'johnny@gmail.com',
    status: 'offline',
    notifications: 'enabled',
    createdAt: '2024-10-02',
  },
  {
    id: '4',
    username: 'jane',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@gmail.com',
    status: 'dnd',
    notifications: 'disabled',
    createdAt: '2024-10-02',
  },
] as User[]
