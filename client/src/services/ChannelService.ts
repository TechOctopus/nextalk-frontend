import { Channel, RawMessage, SerializedMessage } from 'src/contracts'
import { SocketManager } from './SocketManager'
import { useMessageStore } from 'src/stores/messages'
import { useChannelStore } from 'src/stores/channels'

class MessageSocketManager extends SocketManager {
  public subscribe(): void {
    const channel = this.namespace.split('/').pop() as string

    this.socket.on('message', (message: SerializedMessage) => {
      useMessageStore().newMessage(channel, message)
    })
  }

  public addMessage(message: RawMessage): Promise<SerializedMessage> {
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
  }

  public joinChannel(channelName: string, isPrivate: boolean): Promise<Channel> {
    return this.emitAsync('joinChannel', channelName, isPrivate)
  }

  public loadChannels(): Promise<Channel[]> {
    return this.emitAsync('loadChannels')
  }

  public quitChannel(channelName: string): Promise<void> {
    return this.emitAsync('quitChannel', channelName)
  }
}

class ChannelService {
  private channels: Map<string, MessageSocketManager> = new Map()
  private channelManager: ChannelScoketManager

  constructor() {
    this.channelManager = new ChannelScoketManager('/channels')
  }

  public async loadChannels(): Promise<Channel[]> {
    const channels = await this.channelManager.loadChannels()
    channels.forEach((channel) => {
      useMessageStore().join(channel.name)
    })
    return channels
  }

  public async addChannel(channelName: string, isPrivate: boolean): Promise<Channel> {
    return this.channelManager.joinChannel(channelName, isPrivate)
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
