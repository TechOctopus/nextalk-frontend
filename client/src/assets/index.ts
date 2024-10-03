// Data for preview purposes

import { User, Channel } from 'src/types'

export const admin = {
  id: '1',
  username: 'xdavydau',
  firstName: 'Heorhi',
  lastName: 'Davydau',
  email: 'xdavydau@stuba.sk',
  status: 'online',
  createdAt: '2024-10-02',
} as User

export const members = [
  {
    id: '2',
    username: 'artemii',
    firstName: 'Artemii',
    lastName: 'Gurin',
    email: 'artemii@gmail.com',
    status: 'online',
    createdAt: '2024-10-02',
  },
  {
    id: '3',
    username: 'johnny',
    firstName: 'John',
    lastName: 'Doe',
    email: 'johnny@gmail.com',
    status: 'offline',
    createdAt: '2024-10-02',
  },
  {
    id: '4',
    username: 'jane',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@gmail.com',
    status: 'do-not-disturb',
    createdAt: '2024-10-02',
  },
] as User[]

export const channels = [
  {
    id: '1',
    name: 'fiit',
    isPrivate: false,
    createdAt: '2024-10-01',
  },
  {
    id: '2',
    name: 'vpwa',
    isPrivate: false,
    createdAt: '2024-08-01',
  },
  {
    id: '3',
    name: 'nextalk',
    isPrivate: true,
    createdAt: '2024-09-01',
  },
] as Channel[]
