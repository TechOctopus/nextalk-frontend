<template>
  <q-form @submit.stop="sendMessage">
    <q-toolbar class="bg-secondary text-black row">
      <template v-if="isCommand">
        <q-chip label="Command:" />
      </template>
      <q-input
        rounded
        outlined
        dense
        class="WAL__field col-grow q-mr-sm"
        bg-color="white"
        v-model="message"
        placeholder="Type a message"
        ref="commandLineInput"
      />
      <q-btn round flat icon="send" type="submit" />
    </q-toolbar>
  </q-form>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue'
import { useQuasar } from 'quasar'

import { useMessageStore } from 'src/stores/messages'
import { isCommand, send } from 'src/services/commands'

export default defineComponent({
  name: 'CommandLine',

  data() {
    return {
      message: '',
      messagesStore: useMessageStore(),
      q$: useQuasar(),
    }
  },

  methods: {
    async sendMessage() {
      try {
        send(this.message)
        this.message = ''
        await nextTick().then(() => {
          const lastMessage = (this.messagesStore.messagesRefs || []).slice(-1)[0]
          if (lastMessage) {
            lastMessage.scrollIntoView({ behavior: 'smooth' })
          }
          ;(this.$refs.commandLineInput as HTMLInputElement).focus()
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        this.q$.notify({
          message: e.message,
          color: 'negative',
          position: 'top',
        })
      }
    },
  },

  computed: {
    isCommand() {
      return isCommand(this.message)
    },
  },
})
</script>
