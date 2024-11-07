import { useChannelStore } from 'src/stores/channels'
import { useMessageStore } from 'src/stores/messages'

// import { router } from 'src/router'

// const channelStore = useChannelStore()
// const membersStore = useMembersStore()

// export type CommandArgument = {
//   name: string
//   required: boolean
//   value?: string
// }

// export type Command = {
//   commandName: string
//   description: string
//   requireChannel: boolean
//   execute: (...args: string[]) => Promise<void>
//   args?: CommandArgument[]
// }

// function inviteUser(userName: string, channelId: string) {
//   const channelName = channelStore.channels.find((channel) => channel.id === channelId)?.name

//   Notify.create({
//     message: `Invited ${userName} to the channel ${channelName}`,
//     color: 'positive',
//     position: 'top',
//   })
// }

// function revokeUser(userName: string, channelId: string) {
//   const channelName = channelStore.channels.find((channel) => channel.id === channelId)?.name

//   Notify.create({
//     message: `Revoked ${userName} from the channel ${channelName}`,
//     color: 'warning',
//     position: 'top',
//   })
// }

// function kickUser(userName: string, channelId: string) {
//   const channelName = channelStore.channels.find((channel) => channel.id === channelId)?.name

//   Notify.create({
//     message: `Kicked ${userName} from the channel ${channelName}`,
//     color: 'negative',
//     position: 'top',
//   })
// }

// function cancelChannel(channelId: string) {
//   channelStore.resetCurrentChannel()
//   channelStore.deleteChannel(channelId)
//   router.push('/channels/')

//   Notify.create({
//     message: 'Left the channel',
//     color: 'negative',
//     position: 'top',
//   })
// }

// function listMembers(channelId: string) {
//   console.info('listMembers', channelId)
//   membersStore.membersDialog = true
// }

// function createCommand(
//   commandName: string,
//   description: string,
//   requireChannel: boolean,
//   execute: (...args: string[]) => Promise<ApiResponse | void>,
//   args: CommandArgument[] = [],
// ): Command {
//   return {
//     commandName,
//     description,
//     requireChannel,
//     execute,
//     args,
//   }
// }

// export const allCommands: Command[] = [
//   createCommand(
//     'join',
//     'Join a channel, argument: ChannelName, optional: Private',
//     false,
//     async (name: string, isPrivate = 'false') => await joinChannel(name, isPrivate === 'private'),
//     [
//       { name: 'channelName', required: true },
//       { name: 'private', required: false, value: 'private' },
//     ],
//   ),
//   createCommand(
//     'invite',
//     'Invite a user to the channel, argument: UserName',
//     true,
//     async (userName: string, channelId: string) => inviteUser(userName, channelId),
//     [{ name: 'userName', required: true }],
//   ),
//   createCommand(
//     'revoke',
//     'Revoke a user from the channel, argument: UserName',
//     true,
//     async (userName: string, channelId: string) => revokeUser(userName, channelId),
//     [{ name: 'userName', required: true }],
//   ),
//   createCommand(
//     'kick',
//     'Kick a user from the channel, argument: UserName',
//     true,
//     async (userName: string, channelId: string) => kickUser(userName, channelId),
//     [{ name: 'userName', required: true }],
//   ),
//   createCommand('quit', 'Quit the channel', true, async (id: string) => await quitChannel(id)),
//   createCommand('cancel', 'Cancel the current operation', true, async (channelId: string) => cancelChannel(channelId)),
//   createCommand('list', 'List all users in the channel', true, async (channelId: string) => listMembers(channelId)),
// ]

// async function sendCommand(message: string) {
//   const [commandName, ...args] = message.trim().split(' ')
//   const commandDescription = allCommands.find((cmd) => `${COMMAND_SYMBOL}${cmd.commandName}` === commandName)

//   if (!commandDescription) throw new Error('Invalid command')
//   if (commandDescription.requireChannel && !channelStore.currentChannel) throw new Error('No channel selected')
//   else if (commandDescription.requireChannel && channelStore.currentChannel) args.push(channelStore.currentChannel.id)

//   if (commandDescription.args?.length) {
//     if (args.length < commandDescription.args.filter((arg) => arg.required).length) {
//       throw new Error('Missing required arguments')
//     }

//     commandDescription.args.forEach((arg, index) => {
//       if (arg.value && args[index] && args[index] !== arg.value) {
//         throw new Error('Invalid argument value')
//       }
//     })
//   } else if (args.length > 1) {
//     throw new Error('Command does not accept arguments')
//   }

//   await commandDescription.execute(...args)
// }

// async function sendMessage(message: string) {
//   if (!channelStore.currentChannel?.id) {
//     throw new Error('No channel selected')
//   }

//   await messageService.sendMessage(channelStore.currentChannel.id, message)
// }

class CommandService {
  private COMMAND_SYMBOL = '/'

  public isCommand(message: string) {
    return message.startsWith(this.COMMAND_SYMBOL)
  }

  private async sendCommand(message: string) {
    console.log('sendCommand', message)
  }

  private async sendMessage(message: string) {
    const channelName = useChannelStore().active

    if (!channelName) {
      throw new Error('No channel selected')
    }

    useMessageStore().addMessage(channelName, message)
  }

  public async send(message: string) {
    if (message.trim() === '') {
      throw new Error('Message is empty')
    }

    if (message.length > 120) {
      throw new Error('Message is too long')
    }

    if (this.isCommand(message)) {
      await this.sendCommand(message)
    } else {
      await this.sendMessage(message)
    }
  }
}

export default new CommandService()
