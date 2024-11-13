import { Channel, RawMessage, SerializedMessage } from 'src/contracts'
import { SocketManager } from './SocketManager'
import { useMessageStore } from 'src/stores/messages'
import { useChannelStore } from 'src/stores/channels'

import { Notify } from 'quasar'

class MessageSocketManager extends SocketManager {
  public subscribe(): void {
    const channel = this.namespace.split('/').pop() as string

    this.socket.on('message', (message: SerializedMessage) => {
      useMessageStore().newMessage(channel, message)
    })
  }

  public addMessage(message: RawMessage): Promise<{ message: SerializedMessage; isChannelJoined: boolean }> {
    return this.emitAsync('addMessage', message)
  }

  public loadMessages(): Promise<SerializedMessage[]> {
    return this.emitAsync('loadMessages')
  }
}

class ChannelScoketManager extends SocketManager {
  public subscribe(): void {
    this.socket.on('channel', (channel: Channel) => {
      useChannelStore().newChannel(channel)
    })

    this.socket.on('invite', (channel: Channel) => {
      useChannelStore().newChannel(channel)
      useMessageStore().join(channel.name)
      Notify.create({
        message: `You have been invited to channel ${channel.name}`,
        position: 'top',
        color: 'primary',
      })
    })

    this.socket.on('revoke', (channel: Channel) => {
      useChannelStore().removeChannel(channel)
      useMessageStore().leave(channel.name)
      Notify.create({
        message: `You have been revoked from channel ${channel.name}`,
        position: 'top',
        color: 'warning',
      })
    })

    this.socket.on('quit', (channel: Channel) => {
      useChannelStore().removeChannel(channel)
      useMessageStore().leave(channel.name)
      Notify.create({
        message: `Channel ${channel.name} has been deleted`,
        position: 'top',
        color: 'negative',
      })
    })

    this.socket.on('cancel', (channel: Channel) => {
      useChannelStore().removeChannel(channel)
      useMessageStore().leave(channel.name)
      Notify.create({
        message: `Channel ${channel.name} has been canceled`,
        position: 'top',
        color: 'info',
      })
    })

    this.socket.on('kick', (channel: Channel) => {
      useChannelStore().removeChannel(channel)
      useMessageStore().leave(channel.name)
      Notify.create({
        message: `You have been kicked from channel ${channel.name}`,
        position: 'top',
        color: 'warning',
      })
    })

    this.socket.on('ban', (channel: Channel) => {
      useChannelStore().removeChannel(channel)
      useMessageStore().leave(channel.name)
      Notify.create({
        message: `You have been banned from channel ${channel.name}`,
        position: 'top',
        color: 'negative',
      })
    })
  }

  public joinChannel(channelName: string, isPrivate: boolean): Promise<Channel> {
    return this.emitAsync('joinChannel', channelName, isPrivate)
  }

  public loadChannels(): Promise<Channel[]> {
    return this.emitAsync('loadChannels')
  }

  public quitChannel(channelId: string): Promise<void> {
    return this.emitAsync('quitChannel', channelId)
  }

  public inviteUser(userName: string, channelId: string): Promise<void> {
    return this.emitAsync('inviteUser', userName, channelId)
  }

  public revokeUser(userName: string, channelId: string): Promise<void> {
    return this.emitAsync('revokeUser', userName, channelId)
  }

  public cancelChannel(channelId: string): Promise<void> {
    return this.emitAsync('cancelChannel', channelId)
  }

  public kickUser(userName: string, channelId: string): Promise<void> {
    return this.emitAsync('kickUser', userName, channelId)
  }
}

class ChannelService {
  private channels: Map<string, MessageSocketManager> = new Map()
  private channelManager: ChannelScoketManager | null = null

  public async loadChannels(): Promise<Channel[]> {
    this.channelManager = new ChannelScoketManager('/channels')

    const channels = await this.channelManager.loadChannels()
    channels.forEach((channel) => {
      useMessageStore().join(channel.name)
    })
    return channels
  }

  public async quitChannels(channls: Channel[]): Promise<void> {
    if (!this.channelManager) {
      throw new Error('Channel manager is not initialized')
    }

    await Promise.all(
      channls.map(async (channel) => {
        await useMessageStore().leave(channel.name)
      }),
    )

    this.channelManager.destroy()
    this.channelManager = null
  }

  public async addChannel(channelName: string, isPrivate: boolean): Promise<Channel> {
    if (!this.channelManager) {
      throw new Error('Channel manager is not initialized')
    }
    const newChannel = this.channelManager.joinChannel(channelName, isPrivate)
    useMessageStore().join(channelName)
    return newChannel
  }

  public async inviteUser(userName: string, channelId: string): Promise<void> {
    if (!this.channelManager) {
      throw new Error('Channel manager is not initialized')
    }
    await this.channelManager.inviteUser(userName, channelId)
  }

  public async revokeUser(userName: string, channelId: string): Promise<void> {
    if (!this.channelManager) {
      throw new Error('Channel manager is not initialized')
    }
    await this.channelManager.revokeUser(userName, channelId)
  }

  public async quitChannel(channelId: string): Promise<void> {
    if (!this.channelManager) {
      throw new Error('Channel manager is not initialized')
    }
    return this.channelManager.quitChannel(channelId)
  }

  public async cancelChannel(channelId: string): Promise<void> {
    if (!this.channelManager) {
      throw new Error('Channel manager is not initialized')
    }
    await this.channelManager.cancelChannel(channelId)
  }

  public async kickUser(userName: string, channelId: string): Promise<void> {
    if (!this.channelManager) {
      throw new Error('Channel manager is not initialized')
    }
    await this.channelManager.kickUser(userName, channelId)
  }

  public join(name: string): MessageSocketManager {
    if (this.channels.has(name)) {
      throw new Error(`User is already joined in channel "${name}"`)
    }

    // connect to given channel namespace
    const channel = new MessageSocketManager(`/channels/${name}`)
    this.channels.set(name, channel)
    return channel
  }

  public leave(name: string): boolean {
    const channel = this.channels.get(name)

    if (!channel) {
      return false
    }

    // disconnect namespace and remove references to socket
    channel.destroy()
    return this.channels.delete(name)
  }

  public in(name: string): MessageSocketManager | undefined {
    return this.channels.get(name)
  }
}

export default new ChannelService()
