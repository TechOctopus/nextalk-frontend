<template>
  <q-chat-message :name="fullUserName" :sent="isSent" :stamp="message.stamp">
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

import { useUserStore } from 'src/stores/user'

import type { Message } from 'src/contracts'

export default defineComponent({
  name: 'UserMessage',

  data() {
    return {
      userStore: useUserStore(),
    }
  },

  props: {
    message: {
      type: Object as PropType<Message>,
      required: true,
    },
  },

  computed: {
    isSent(): boolean {
      return this.message.user.id === this.userStore.user?.id
    },

    isMention(): boolean {
      return this.message.mentions?.some((mention) => mention.id === this.userStore.user?.id) ?? false
    },

    fullUserName(): string {
      return `${this.message.user.firstName} ${this.message.user.lastName}`
    },
  },
})
</script>

<style lang="scss">
.mention {
  color: blue;
}
</style>
