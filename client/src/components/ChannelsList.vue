<template>
  <q-toolbar class="bg-grey-2">
    <q-input rounded outlined dense class="WAL__field full-width" v-model="search" placeholder="Search channels">
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>
  </q-toolbar>

  <q-scroll-area style="height: calc(100% - 100px)">
    <q-list>
      <q-item v-if="channels.length === 0">
        <p class="text-center">No channels found</p>
      </q-item>
      <q-item
        v-for="channel in channels"
        :key="channel.id"
        @click="handleChooseChannel(channel.name)"
        clickable
        v-ripple
      >
        <q-item-section>
          <q-item-label lines="1">
            {{ channel.name }}
          </q-item-label>
          <q-item-label class="conversation__summary" caption>
            {{ channel.createdAt }}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon v-if="channel.isPrivate" name="lock" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-scroll-area>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useChannelStore } from 'src/stores/channels'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'ChannelsList',

  data() {
    return {
      search: '',
      router: useRouter(),
      channelsStore: useChannelStore(),
    }
  },

  methods: {
    handleChooseChannel(channelName: string) {
      this.search = ''
      this.router.push(`/channels/${channelName}`)
    },
  },

  computed: {
    channels() {
      return this.channelsStore.channels
        .filter((channel) => channel.name.toLowerCase().includes(this.search.toLowerCase()))
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .sort((a, b) => (b.status === 'invite' ? 1 : 0) - (a.status === 'invite' ? 1 : 0))
    },
  },
})
</script>
