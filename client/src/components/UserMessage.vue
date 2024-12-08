<template>
  <q-chat-message v-if="message.typing" :name="fullUserName">
    <q-btn flat dense style="width: 100%; height: 2rem">
      <q-spinner-dots />
      <q-menu fit auto-close>
        <p class="message_typing">{{ message.content }}</p>
      </q-menu>
    </q-btn>
  </q-chat-message>
  <q-chat-message v-else :name="fullUserName" :sent="isSent" :stamp="stamp">
    <div>
      <q-badge v-if="isMention" rounded color="orange" floating>
        <q-icon name="person" />
      </q-badge>
      <div v-html="message.content" />
    </div>
  </q-chat-message>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

import { useAuthStore } from 'src/stores'

import type { SerializedMessage } from 'src/contracts'
import { humanDate } from 'src/utils'

export default defineComponent({
  name: 'UserMessage',

  data() {
    return {
      messageTyping: '',
      authStore: useAuthStore(),
    }
  },

  props: {
    message: {
      type: Object as PropType<SerializedMessage>,
      required: true,
    },
  },

  computed: {
    isSent(): boolean {
      return this.message.author.id === this.authStore.user?.id
    },

    isMention(): boolean {
      return this.message.mentions?.some((mention) => mention.id === this.authStore.user?.id) ?? false
    },

    fullUserName(): string {
      return `${this.message.author.firstName} ${this.message.author.lastName}`
    },

    stamp(): string {
      return humanDate(this.message.createdAt)
    },
  },
})
</script>
