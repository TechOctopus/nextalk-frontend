import { useChannelStore } from 'src/stores/channels'
import { useMessageStore } from 'src/stores/messages'

const channelStore = useChannelStore()
const messageStore = useMessageStore()

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
  execute: (...args: string[]) => void
  args?: CommandArgument[]
}

function joinChannel(name: string, isPrivate: boolean) {
  console.log('Joining channel:', name, isPrivate)
}

function inviteUser(userName: string, channelId: string) {
  console.log('Inviting user:', userName, channelId)
}

function revokeUser(userName: string, channelId: string) {
  console.log('Revoking user:', userName, channelId)
}

function kickUser(userName: string, channelId: string) {
  console.log('Kicking user:', userName, channelId)
}

function quitChannel(channelId: string) {
  console.log('Quitting channel:', channelId)
}

function cancelChannel(channelId: string) {
  console.log('Cancelling channel:', channelId)
}

function listMembers(channelId: string) {
  console.log('Listing members:', channelId)
}

function createCommand(
  commandName: string,
  description: string,
  requireChannel: boolean,
  execute: (...args: string[]) => void,
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
    (name: string, isPrivate = 'false') => joinChannel(name, isPrivate === 'private'),
    [
      { name: 'channelName', required: true },
      { name: 'private', required: false, value: 'private' },
    ],
  ),
  createCommand(
    'invite',
    'Invite a user to the channel, argument: UserName',
    true,
    (userName: string, channelId: string) => inviteUser(userName, channelId),
    [{ name: 'userName', required: true }],
  ),
  createCommand(
    'revoke',
    'Revoke a user from the channel, argument: UserName',
    true,
    (userName: string, channelId: string) => revokeUser(userName, channelId),
    [{ name: 'userName', required: true }],
  ),
  createCommand(
    'kick',
    'Kick a user from the channel, argument: UserName',
    true,
    (userName: string, channelId: string) => kickUser(userName, channelId),
    [{ name: 'userName', required: true }],
  ),
  createCommand('quit', 'Quit the channel', true, (channelId: string) => quitChannel(channelId)),
  createCommand('cancel', 'Cancel the current operation', true, (channelId: string) => cancelChannel(channelId)),
  createCommand('list', 'List all users in the channel', true, (channelId: string) => listMembers(channelId)),
]

function sendCommand(message: string) {
  const [commandName, ...args] = message.trim().split(' ')
  const commandDescription = allCommands.find((cmd) => `${COMMAND_SYMBOL}${cmd.commandName}` === commandName)

  console.log('Command:', commandDescription)

  if (!commandDescription) throw new Error('Invalid command')
  if (commandDescription.requireChannel && !channelStore.currentChannel) throw new Error('No channel selected')
  else if (commandDescription.requireChannel && channelStore.currentChannel) args.push(channelStore.currentChannel.id)

  if (commandDescription.args) {
    if (args.length < commandDescription.args.filter((arg) => arg.required).length) {
      throw new Error('Missing required arguments')
    }

    commandDescription.args.forEach((arg, index) => {
      if (arg.value && args[index] && args[index] !== arg.value) {
        throw new Error('Invalid argument value')
      }
    })
  }

  commandDescription.execute(...args)
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

export function send(message: string) {
  if (message.trim() === '') {
    return
  }

  isCommand(message) ? sendCommand(message) : sendMessage(message)
}
