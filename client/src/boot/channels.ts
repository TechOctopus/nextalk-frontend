import { boot } from 'quasar/wrappers'
import { useChannelStore } from 'src/stores/channels'

export default boot(({ router }) => {
  const channelsStore = useChannelStore()
  router.beforeEach(async (to, from, next) => {
    if (to && to.name === 'channels') {
      const channelName = to.params.name as string
      if (channelsStore.getChannelByName(channelName)) {
        channelsStore.setCurrentChannel(channelName)
        return next()
      }
      channelsStore.resetCurrentChannel()
      return next({ name: 'nochannels' })
    }
    if (to && (to.name === 'nochannels' || to.name === 'settings')) {
      channelsStore.resetCurrentChannel()
    }
    next()
  })
})
