import { useChannelStore } from 'src/stores/channels'
import { apiRequest } from 'src/utils/api'
import { router } from 'src/router'

import { Ws } from 'boot/ws'

import type { Channel } from 'src/contracts'

class ChannelService {
  private loaded = false
  private channelsStore = useChannelStore()
  private socket = Ws.getSocket()

  async load() {
    if (this.loaded) return
    this.loaded = true

    const response = await apiRequest('GET', '/channel')

    if (response.ok) {
      this.channelsStore.initChannels(response.data)
      router.push(`/channels/${this.channelsStore.channels[0].name}`)
    } else {
      throw new Error('Failed to load channels')
    }

    this.setupSocketListeners()
  }

  private setupSocketListeners() {
    this.socket.on('joinChannel', (channel: Channel) => {
      this.channelsStore.addChannel(channel)
      this.socket.emit('joinChannel', channel.id)
      router.push(`/channels/${channel.name}`)
    })

    this.socket.on('leaveChannel', (channelId: string) => {
      this.channelsStore.deleteChannel(channelId)
      this.socket.emit('leaveChannel', channelId)
      router.push('/channels/')
    })
  }
}

export const channelService = new ChannelService()
