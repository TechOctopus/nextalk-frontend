<template>
  <q-form @submit.stop="sendMessage">
    <q-toolbar class="bg-secondary text-black row">
      <template v-if="isCommand">
        <q-btn
          label="Command:"
          flat
          dense
          class="q-mr-sm q-pa-sm"
          style="background: #dadada"
          rounded
          no-caps
          @click="showCommandsHelpDialog = true"
        />
        <dialog-wrapper v-model="showCommandsHelpDialog" title="Commands Help" maxWidth="400px">
          <commands-help />
        </dialog-wrapper>
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
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'

import DialogWrapper from 'src/components/DialogWrapper.vue'
import CommandsHelp from 'src/components/CommandsHelp.vue'

import { useChannelStore } from 'src/stores/channels'
import { useMessageStore } from 'src/stores/messages'

import { commandService, typingService } from 'src/services'

export default defineComponent({
  name: 'CommandLine',

  components: {
    DialogWrapper,
    CommandsHelp,
  },

  data() {
    return {
      message: '',
      showCommandsHelpDialog: false,
      channelStore: useChannelStore(),
      messageStore: useMessageStore(),
      q$: useQuasar(),
    }
  },

  methods: {
    async sendMessage() {
      try {
        await commandService.send(this.message)
        this.message = ''
        setTimeout(() => {
          this.messageStore.scrollArea?.scrollIntoView({
            behavior: 'smooth',
          })
        }, 100)
        ;(this.$refs.commandLineInput as HTMLInputElement).focus()
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
      return commandService.isCommand(this.message)
    },
  },

  watch: {
    message: {
      handler() {
        if (this.message.length > 0) {
          typingService.typing(this.message)
        } else {
          typingService.stopTyping()
        }
      },
      immediate: true,
    },
  },
})
</script>
