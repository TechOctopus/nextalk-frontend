// Data for preview purposes

import { User, Channel } from 'src/contracts'

export const admin = {
  id: '1',
  username: 'xdavydau',
  firstName: 'Heorhi',
  lastName: 'Davydau',
  email: 'xdavydau@stuba.sk',
  status: 'online',
  notifications: 'enabled',
  createdAt: '2024-10-02',
} as User

export const user = {
  id: '2',
  username: 'artemii',
  firstName: 'Artemii',
  lastName: 'Gurin',
  email: 'artemii@gmail.com',
  status: 'online',
  notifications: 'enabled',
  createdAt: '2024-10-02',
} as User

export const members = [
  user,
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

let channelId = 1

export const incrementChannelId = () => {
  return `${channelId++}`
}

export const channels = [
  {
    id: incrementChannelId(),
    name: 'fiit',
    isPrivate: false,
    createdAt: '2024-10-01',
    status: 'join',
  },
  {
    id: incrementChannelId(),
    name: 'vpwa',
    isPrivate: false,
    createdAt: '2024-08-01',
    status: 'invite',
  },
  {
    id: incrementChannelId(),
    name: 'nextalk',
    isPrivate: true,
    createdAt: '2024-09-01',
    status: 'join',
  },
] as Channel[]
