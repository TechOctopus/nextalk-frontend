import { useChannelStore } from 'src/stores/channels'
import { useMessageStore } from 'src/stores/messages'
import { useMembersStore } from 'src/stores/members'

import { Notify } from 'quasar'
import { router } from 'src/router'

import { joinChannel, quitChannel, ApiResponse } from 'src/utils/api'

const channelStore = useChannelStore()
const messageStore = useMessageStore()
const membersStore = useMembersStore()

export const COMMAND_SYMBOL = '/'

export type CommandArgument = {
  name: string
  required: boolean
  value?: string
}

export type Command = {
  commandName: string
  description: string
  requireChannel: boolean
  execute: (...args: string[]) => Promise<ApiResponse | void>
  args?: CommandArgument[]
}

function inviteUser(userName: string, channelId: string) {
  const channelName = channelStore.channels.find((channel) => channel.id === channelId)?.name

  Notify.create({
    message: `Invited ${userName} to the channel ${channelName}`,
    color: 'positive',
    position: 'top',
  })
}

function revokeUser(userName: string, channelId: string) {
  const channelName = channelStore.channels.find((channel) => channel.id === channelId)?.name

  Notify.create({
    message: `Revoked ${userName} from the channel ${channelName}`,
    color: 'warning',
    position: 'top',
  })
}

function kickUser(userName: string, channelId: string) {
  const channelName = channelStore.channels.find((channel) => channel.id === channelId)?.name

  Notify.create({
    message: `Kicked ${userName} from the channel ${channelName}`,
    color: 'negative',
    position: 'top',
  })
}

function cancelChannel(channelId: string) {
  channelStore.resetCurrentChannel()
  channelStore.removeChannel(channelId)
  router.push('/channels/')

  Notify.create({
    message: 'Left the channel',
    color: 'negative',
    position: 'top',
  })
}

function listMembers(channelId: string) {
  console.info('listMembers', channelId)
  membersStore.membersDialog = true
}

function createCommand(
  commandName: string,
  description: string,
  requireChannel: boolean,
  execute: (...args: string[]) => Promise<ApiResponse | void>,
  args: CommandArgument[] = [],
): Command {
  return {
    commandName,
    description,
    requireChannel,
    execute,
    args,
  }
}

export const allCommands: Command[] = [
  createCommand(
    'join',
    'Join a channel, argument: ChannelName, optional: Private',
    false,
    async (name: string, isPrivate = 'false') => await joinChannel(name, isPrivate === 'private'),
    [
      { name: 'channelName', required: true },
      { name: 'private', required: false, value: 'private' },
    ],
  ),
  createCommand(
    'invite',
    'Invite a user to the channel, argument: UserName',
    true,
    async (userName: string, channelId: string) => inviteUser(userName, channelId),
    [{ name: 'userName', required: true }],
  ),
  createCommand(
    'revoke',
    'Revoke a user from the channel, argument: UserName',
    true,
    async (userName: string, channelId: string) => revokeUser(userName, channelId),
    [{ name: 'userName', required: true }],
  ),
  createCommand(
    'kick',
    'Kick a user from the channel, argument: UserName',
    true,
    async (userName: string, channelId: string) => kickUser(userName, channelId),
    [{ name: 'userName', required: true }],
  ),
  createCommand('quit', 'Quit the channel', true, async (id: string) => await quitChannel(id)),
  createCommand('cancel', 'Cancel the current operation', true, async (channelId: string) => cancelChannel(channelId)),
  createCommand('list', 'List all users in the channel', true, async (channelId: string) => listMembers(channelId)),
]

async function sendCommand(message: string) {
  const [commandName, ...args] = message.trim().split(' ')
  const commandDescription = allCommands.find((cmd) => `${COMMAND_SYMBOL}${cmd.commandName}` === commandName)

  if (!commandDescription) throw new Error('Invalid command')
  if (commandDescription.requireChannel && !channelStore.currentChannel) throw new Error('No channel selected')
  else if (commandDescription.requireChannel && channelStore.currentChannel) args.push(channelStore.currentChannel.id)

  if (commandDescription.args?.length) {
    if (args.length < commandDescription.args.filter((arg) => arg.required).length) {
      throw new Error('Missing required arguments')
    }

    commandDescription.args.forEach((arg, index) => {
      if (arg.value && args[index] && args[index] !== arg.value) {
        throw new Error('Invalid argument value')
      }
    })
  } else if (args.length > 1) {
    throw new Error('Command does not accept arguments')
  }

  await commandDescription.execute(...args)
}

function sendMessage(message: string) {
  if (!channelStore.currentChannel?.id) {
    throw new Error('No channel selected')
  }

  messageStore.sendMessage(channelStore.currentChannel.id, message)
}

export function isCommand(message: string) {
  return message.startsWith(COMMAND_SYMBOL)
}

export async function send(message: string) {
  if (message.trim() === '') {
    return
  }

  if (message.length > 120) {
    Notify.create({
      message: 'Message is too long',
      color: 'negative',
      position: 'top',
    })
    return
  }

  if (isCommand(message)) {
    await sendCommand(message)
  } else {
    sendMessage(message)
  }
}
