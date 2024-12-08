import { useChannelStore } from 'src/stores/channels'
import { useMessageStore } from 'src/stores/messages'

import { router } from 'src/router'
import { Notify } from 'quasar'
import { useMembersStore } from 'src/stores/members'

type CommandArgument = {
  name: string
  required: boolean
  value?: string
}

type Command = {
  commandName: string
  description: string
  requireChannel: boolean
  execute: (...args: string[]) => Promise<void>
  args?: CommandArgument[]
}

class CommandService {
  private COMMAND_SYMBOL = '/'

  public allCommands: Command[] = [
    this.createCommand(
      'join',
      'Join a channel, argument: ChannelName, optional: Private',
      false,
      async (name: string, isPrivate = 'false') => await this.joinChannel(name, isPrivate === 'private'),
      [
        { name: 'channelName', required: true },
        { name: 'private', required: false, value: 'private' },
      ],
    ),
    this.createCommand(
      'invite',
      'Invite a user to the channel, argument: UserName',
      true,
      async (userName: string, channelId: string) => this.inviteUser(userName, channelId),
      [{ name: 'userName', required: true }],
    ),
    this.createCommand(
      'revoke',
      'Revoke a user from the channel, argument: UserName',
      true,
      async (userName: string, channelId: string) => this.revokeUser(userName, channelId),
      [{ name: 'userName', required: true }],
    ),
    this.createCommand(
      'kick',
      'Kick a user from the channel, argument: UserName',
      true,
      async (userName: string, channelId: string) => this.kickUser(userName, channelId),
      [{ name: 'userName', required: true }],
    ),
    this.createCommand('quit', 'Quit the channel', true, async (id: string) => this.quitChannel(id)),
    this.createCommand('cancel', 'Cancel the current operation', true, async (channelId: string) =>
      this.cancelChannel(channelId),
    ),
    this.createCommand('list', 'List all users in the channel', true, async (channelId: string) =>
      this.listMembers(channelId),
    ),
  ]

  public isCommand(message: string) {
    return message.startsWith(this.COMMAND_SYMBOL)
  }

  private async joinChannel(name: string, isPrivate: boolean) {
    console.info('Joining channel', name, isPrivate)
    try {
      await useChannelStore().addChannel(name, isPrivate)
      router.push(`/channels/${name}`)
      // Notify.create({
    } catch (error) {
      Notify.create({
        message: 'Could not join channel',
        color: 'negative',
        position: 'top',
      })
    }
  }

  public inviteUser(userName: string, channelId: string) {
    console.info('Inviting user', userName, channelId)
    useChannelStore().inviteUser(userName, channelId)
  }

  private revokeUser(userName: string, channelId: string) {
    console.info('Revoking user', userName, channelId)
    useChannelStore().revokeUser(userName, channelId)
  }

  private quitChannel(channelId: string) {
    console.info('Quitting channel', channelId)
    useChannelStore().quitChannel(channelId)
  }

  private kickUser(userName: string, channelId: string) {
    console.info('Kicking user', userName, channelId)
    useChannelStore().kickUser(userName, channelId)
  }

  private cancelChannel(channelId: string) {
    console.info('Cancelling operation', channelId)
    useChannelStore().cancelChannel(channelId)
  }

  private listMembers(channelId: string) {
    console.info('Listing members', channelId)
    useMembersStore().membersDialog = true
  }

  private createCommand(
    commandName: string,
    description: string,
    requireChannel: boolean,
    execute: (...args: string[]) => Promise<void>,
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

  private async sendCommand(message: string) {
    const currentChannel = useChannelStore().active

    const [commandName, ...args] = message.trim().split(' ')
    const commandDescription = this.allCommands.find(
      (cmd) => `${this.COMMAND_SYMBOL}${cmd.commandName}` === commandName,
    )

    if (!commandDescription) throw new Error('Invalid command')
    if (commandDescription.requireChannel && !currentChannel) throw new Error('No channel selected')
    else if (commandDescription.requireChannel && currentChannel) args.push(currentChannel.id)

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

  private async sendMessage(message: string) {
    const currentChannel = useChannelStore().active

    if (!currentChannel) {
      throw new Error('No channel selected')
    }

    useMessageStore().addMessage(currentChannel.name, message)
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
