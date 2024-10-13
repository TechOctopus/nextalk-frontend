<template>
  <q-page>
    <div class="q-pa-md">
      <q-list>
        <q-item-label header>Notifications</q-item-label>

        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Enable notifications</q-item-label>
            <q-item-label caption> If you disable this, you will not receive any notifications </q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-toggle v-model="notification" :disable="isNotificationDisabled" />
          </q-item-section>
        </q-item>

        <q-item tag="label" v-ripple>
          <q-item-section side top>
            <q-checkbox v-model="notificationMentions" :disable="isNotificationMentionsDisabled" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Only Mentions</q-item-label>
            <q-item-label caption> Only receive notifications for messages that mention you @username </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced />
        <q-item-label header>Online status</q-item-label>

        <q-item clickable @click="userStore.setUserStatus('online')">
          <q-item-section avatar>
            <q-icon name="circle" color="green" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Online</q-item-label>
            <q-item-label caption>Everyone can see you</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-icon v-if="userStore.user.status === 'online'" name="check" />
          </q-item-section>
        </q-item>
        <q-item clickable @click="userStore.setUserStatus('offline')">
          <q-item-section avatar>
            <q-icon name="do_not_disturb_off" color="grey-8" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Offline</q-item-label>
            <q-item-label caption>You will appear offline</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-icon v-if="userStore.user.status === 'offline'" name="check" />
          </q-item-section>
        </q-item>
        <q-item clickable @click="userStore.setUserStatus('dnd')">
          <q-item-section avatar>
            <q-icon name="do_not_disturb_on" color="orange" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Do Not Disturb</q-item-label>
            <q-item-label caption>You will appear offline and receive no notifications</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-icon v-if="userStore.user.status === 'dnd'" name="check" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useUserStore } from 'src/stores/user'

export default defineComponent({
  name: 'SettingsPage',

  data() {
    return {
      userStore: useUserStore(),
      user: useUserStore().user,
    }
  },

  computed: {
    notification: {
      get() {
        return this.user.notifications === 'enabled' || this.user.notifications === 'mentions'
      },
      set(value: boolean) {
        this.user.notifications = value ? 'enabled' : 'disabled'
      },
    },

    notificationMentions: {
      get() {
        return this.user.notifications === 'mentions'
      },
      set(value: boolean) {
        this.user.notifications = value ? 'mentions' : 'enabled'
      },
    },

    isNotificationDisabled() {
      return this.user.status === 'dnd'
    },

    isNotificationMentionsDisabled() {
      return this.user.notifications === 'disabled'
    },
  },
})
</script>
