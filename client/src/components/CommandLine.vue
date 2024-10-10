<template>
  <q-form @submit.stop="sendMessage">
    <q-toolbar class="bg-secondary text-black row">
      <q-input
        rounded
        outlined
        dense
        class="WAL__field col-grow q-mr-sm"
        bg-color="white"
        v-model="message"
        placeholder="Type a message"
      />
      <q-btn round flat icon="send" type="submit" />
    </q-toolbar>
  </q-form>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue'
import { useQuasar } from 'quasar'

import { useChannelStore } from 'src/stores/channels'
import { useMessageStore } from 'src/stores/messages'

export default defineComponent({
  name: 'CommandLine',

  data() {
    return {
      message: '',
      channelsStore: useChannelStore(),
      messagesStore: useMessageStore(),
      q$: useQuasar(),
    }
  },

  methods: {
    async sendMessage() {
      if (!this.channelsStore.currentChannel?.id) {
        this.q$.notify({
          message: 'Select a channel first',
          color: 'negative',
          position: 'top',
        })
        return
      }
      if (!this.message.trim()) {
        return
      }
      this.messagesStore.sendMessage(this.channelsStore.currentChannel.id, this.message)
      this.message = ''

      await nextTick().then(() => {
        const lastMessage = (this.messagesStore.messagesRefs || []).slice(-1)[0]
        if (lastMessage) {
          lastMessage.scrollIntoView({ behavior: 'smooth' })
        }
      })
    },
  },
})
</script>
