<template>
  <div style="width: 100%">
    <q-list>
      <!-- <q-item class="q-px-none">
        <q-item-section>
          <q-item-label lines="1">{{ fullName(admin) }}</q-item-label>
          <q-item-label caption lines="2">{{ admin.status }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-badge label="admin" color="teal" />
        </q-item-section>
      </q-item> -->

      <q-item class="q-px-none" v-for="member in members" :key="member.id">
        <q-item-section>
          <q-item-label lines="1">{{ fullName(member) }}</q-item-label>
          <q-item-label caption lines="2">{{ member.status }}</q-item-label>
        </q-item-section>
        <q-item-section top side>
          <q-btn class="gt-xs" size="12px" flat dense round icon="delete" />
        </q-item-section>
      </q-item>

      <q-item-label header class="q-px-none">Add member</q-item-label>
      <q-item-section class="q-px-none">
        <q-form class="full-width" style="display: flex; gap: 10px">
          <q-input v-model="form.newMember" label="Username" class="full-width" outlined dense />
          <q-btn label="Add" color="primary" />
        </q-form>
      </q-item-section>

      <template v-if="isAdmin">
        <q-item-label header class="q-px-none">Delete channel</q-item-label>
        <q-item-section class="q-px-none">
          <q-item-label class="q-pb-md">Deleting the channel will remove all messages and members</q-item-label>
          <q-btn label="Delete channel" color="negative" outline @click="cancelChannel" />
        </q-item-section>
      </template>
      <template v-else>
        <q-item-label header class="q-px-none">Leave channel</q-item-label>
        <q-item-section class="q-px-none">
          <q-btn label="Leave channel" color="negative" outline @click="cancelChannel" />
        </q-item-section>
      </template>
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { User } from 'src/contracts'

import { useAuthStore } from 'src/stores'
import { useChannelStore } from 'src/stores/channels'

import { members } from 'src/assets'

export default defineComponent({
  name: 'ChannelInfo',

  data() {
    return {
      authStore: useAuthStore(),
      channelStore: useChannelStore(),
      members,
      form: { newMember: '' },
    }
  },

  methods: {
    fullName(user: User) {
      return `${user.firstName} ${user.lastName}`
    },

    cancelChannel() {
      const channelId = this.channelStore.active?.id
      if (!channelId) return
      this.channelStore.cancelChannel(channelId)
    },
  },

  computed: {
    isAdmin() {
      console.log(this.authStore.user?.id, this.channelStore.active?.adminId)
      return this.authStore.user?.id === this.channelStore.active?.adminId
    },
  },
})
</script>
