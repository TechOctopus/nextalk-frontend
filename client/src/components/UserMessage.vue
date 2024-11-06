<template>
  <q-chat-message :name="fullUserName" :sent="isSent" :stamp="message.stamp">
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

export default defineComponent({
  name: 'UserMessage',

  data() {
    return {
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
  },

  mounted() {
    console.log(this.message)
  },
})
</script>

<style lang="scss">
.mention {
  color: blue;
}
</style>
