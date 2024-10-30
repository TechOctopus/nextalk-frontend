<template>
  <q-chat-message v-if="message.typing" :name="fullUserName">
    <q-btn flat dense style="width: 100%; height: 2rem">
      <q-spinner-dots />
      <q-menu fit auto-close>
        <p class="message_typing">
          {{ messageTyping }}
        </p>
      </q-menu>
    </q-btn>
  </q-chat-message>
  <q-chat-message v-else :name="fullUserName" :sent="isSent" :stamp="message.stamp">
    <div>
      <q-badge v-if="isMention" rounded color="orange" floating>
        <q-icon name="person" />
      </q-badge>
      <div v-html="message.text" />
    </div>
  </q-chat-message>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

import { user } from 'src/assets'
import type { Message } from 'src/contracts'

export default defineComponent({
  name: 'UserMessage',

  data() {
    return {
      messageTyping: '',
      messageTypingDestroy: null as (() => void) | null,
    }
  },

  props: {
    message: {
      type: Object as PropType<Message>,
      required: true,
    },
  },

  methods: {
    simulateTyping() {
      let index = 1

      const intervalId = setInterval(() => {
        this.messageTyping = this.message.text.slice(0, index++)
        if (index > this.message.text.length) {
          index = 1
        }
      }, 250)

      return () => clearInterval(intervalId)
    },
  },

  computed: {
    isSent(): boolean {
      return this.message.user.id === user.id
    },

    isMention(): boolean {
      return this.message.mentions?.some((mention) => mention.id === user.id) ?? false
    },

    fullUserName(): string {
      return `${this.message.user.firstName} ${this.message.user.lastName}`
    },
  },

  mounted() {
    this.messageTypingDestroy = this.simulateTyping()
  },

  beforeUnmount() {
    if (this.messageTypingDestroy) {
      this.messageTypingDestroy()
    }
  },
})
</script>

<style lang="scss">
.mention {
  color: blue;
}

.message_typing {
  margin: 0;
  padding: 0.5rem;
  font-size: 0.8rem;
  color: #9e9e9e;
}
</style>
