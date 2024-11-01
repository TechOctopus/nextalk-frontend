import { useChannelStore } from 'src/stores/channels'
import { apiRequest } from 'src/utils/api'

class ChannelService {
  private loaded = false
  private channelsStore = useChannelStore()

  async load() {
    if (this.loaded) return
    this.loaded = true

    const response = await apiRequest('GET', '/channel')

    if (response.ok) {
      this.channelsStore.initChannels(response.data)
    } else {
      throw new Error('Failed to load channels')
    }
  }
}

export const channelService = new ChannelService()
