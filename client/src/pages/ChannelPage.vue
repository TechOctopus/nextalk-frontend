<template>
  <q-page>
    <div class="q-pa-md row justify-center">
      <div style="width: 100%">
        <q-infinite-scroll @load="loadMore" reverse>
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner color="primary" name="dots" size="40px" />
            </div>
          </template>
          <div v-for="(message, index) in messages" :key="index" ref="bottomEls">
            <user-message :message="message" />
          </div>
        </q-infinite-scroll>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useChannelStore } from 'src/stores/channels'
import { useMessageStore } from 'src/stores/messages'

import UserMessage from 'src/components/UserMessage.vue'

export default defineComponent({
  name: 'ChannelPage',

  components: {
    UserMessage,
  },

  data() {
    return {
      channelStore: useChannelStore(),
      messageStore: useMessageStore(),
    }
  },

  methods: {
    async loadMore(index: number, done: (stop: boolean) => void) {
      done(true)
    },
  },

  computed: {
    messages() {
      return this.messageStore.getMessages(this.channelStore.active ?? '')
    },
  },

  // watch: {
  //   messages: {
  //     async handler() {
  //       this.messageStore.messagesRefs = this.$refs.bottomEls as HTMLElement[]
  //     },
  //     deep: true,
  //   },
  // },
})
</script>
