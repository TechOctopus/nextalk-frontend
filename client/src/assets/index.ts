// Data for preview purposes

import { User, Channel, Message } from 'src/types'

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

export const channels = [
  {
    id: '1',
    name: 'fiit',
    isPrivate: false,
    createdAt: '2024-10-01',
    status: 'join',
  },
  {
    id: '2',
    name: 'vpwa',
    isPrivate: false,
    createdAt: '2024-08-01',
    status: 'invite',
  },
  {
    id: '3',
    name: 'nextalk',
    isPrivate: true,
    createdAt: '2024-09-01',
    status: 'join',
  },
] as Channel[]

// Dummy data generated by AI
export const messagesFor1 = [
  {
    user,
    text: 'Hello!',
    stamp: '12:00:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user: admin,
    text: 'Hi!',
    stamp: '12:01:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user,
    text: 'How are you?',
    stamp: '12:04:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user: admin,
    text: 'I am fine, thank you!',
    stamp: '12:05:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user,
    text: 'What are you doing?',
    stamp: '12:23:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user: admin,
    text: 'I am working on a new project',
    stamp: '12:24:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user,
    text: 'That sounds interesting!',
    stamp: '12:25:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user: admin,
    text: 'Yes, it is!',
    stamp: '12:26:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user,
    text: 'Can you tell me more about it?',
    stamp: '12:27:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user: admin,
    text: 'Sure!. It is a chat application that allows users to communicate with each other in real-time',
    stamp: '12:28:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user,
    text: 'Sounds great! 😎',
    stamp: '12:32:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user: admin,
    text: 'Thank you!',
    stamp: '12:33:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user,
    text: 'I will try it out!',
    stamp: '12:34:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user: admin,
    text: 'Great!',
    stamp: '12:35:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user,
    text: 'How can I start it in development mode?',
    stamp: '12:36:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user: admin,
    text: 'You can run `quasar dev`',
    stamp: '12:37:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user,
    text: 'Thank you! I will try it out!',
    stamp: '12:38:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user: admin,
    text: 'You are welcome!',
    stamp: '12:39:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user,
    text: 'Is it use Quasar for frontend?',
    stamp: '12:40:00 AM',
    mentions: [admin],
    createdAt: '2024-10-02',
  },
  {
    user: admin,
    text: 'Yes, it is!',
    stamp: '12:40:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user,
    text: 'Great! I like Quasar!',
    stamp: '12:42:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user: admin,
    text: 'Me too!',
    stamp: '12:43:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user,
    text: 'I have used it in my previous projects',
    stamp: '12:44:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user: admin,
    text: 'That is great!',
    stamp: '12:45:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user,
    text: 'It is very easy to use',
    stamp: '12:46:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user: admin,
    text: 'Yes, it is!',
    stamp: '12:47:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user,
    text: 'I like the documentation',
    stamp: '12:48:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user: admin,
    text: 'It is very detailed',
    stamp: '12:49:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user,
    text: 'Yes, it is!',
    stamp: '12:50:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user: admin,
    text: 'I have learned a lot from it',
    stamp: '12:51:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user,
    text: 'Me too!',
    stamp: '12:52:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user: admin,
    text: 'It is very helpful',
    stamp: '12:53:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user,
    text: 'I recommend it to everyone',
    stamp: '12:54:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user: admin,
    text: 'That is great! So du you have any questions?',
    stamp: '12:55:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user,
    text: 'No, I do not have any questions',
    stamp: '12:56:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user: admin,
    text: 'Ok, feel free to ask me anything',
    stamp: '12:57:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user,
    text: 'Thank you!',
    stamp: '12:58:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user: admin,
    text: 'You are welcome!',
    stamp: '12:59:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user,
    text: 'Goodbye!',
    stamp: '13:00:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user: admin,
    text: 'Goodbye!',
    stamp: '13:01:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user: admin,
    text: 'Hi, <span class="mention">@artemii</span>!',
    stamp: '13:02:00 AM',
    mentions: [user],
    createdAt: '2024-10-02',
  },
  {
    user: admin,
    text: 'Hi, how are you?',
    typing: true,
    stamp: '13:03:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
] as Message[]

export const messagesFor2 = [
  {
    user: admin,
    text: 'Hi, <span class="mention">@johnny</span>!',
    stamp: '13:03:00 AM',
    mentions: [members[1]],
    createdAt: '2024-10-02',
  },
  {
    user: admin,
    text: 'Hi, <span class="mention">@jane</span>!',
    stamp: '13:04:00 AM',
    mentions: [members[2]],
    createdAt: '2024-10-02',
  },
] as Message[]

export const messagesFor3 = [
  {
    user,
    text: 'Hi, how are you?',
    stamp: '13:05:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
  {
    user: admin,
    text: 'I am cool, thank you!',
    stamp: '13:06:00 AM',
    mentions: [],
    createdAt: '2024-10-02',
  },
] as Message[]
