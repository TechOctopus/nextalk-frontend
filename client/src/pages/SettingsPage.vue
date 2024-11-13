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
            <q-toggle v-model="notifications" :disable="isNotificationDisabled" />
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

        <q-item clickable @click="authStore.setUserStatus('online')">
          <q-item-section avatar>
            <q-icon name="circle" color="green" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Online</q-item-label>
            <q-item-label caption>Everyone can see you</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-icon v-if="authStore.user?.status === 'online'" name="check" />
          </q-item-section>
        </q-item>
        <q-item clickable @click="authStore.setUserStatus('offline')">
          <q-item-section avatar>
            <q-icon name="do_not_disturb_off" color="grey-8" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Offline</q-item-label>
            <q-item-label caption>You will appear offline</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-icon v-if="authStore.user?.status === 'offline'" name="check" />
          </q-item-section>
        </q-item>
        <q-item clickable @click="authStore.setUserStatus('dnd')">
          <q-item-section avatar>
            <q-icon name="do_not_disturb_on" color="orange" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Do Not Disturb</q-item-label>
            <q-item-label caption>You will appear offline and receive no notifications</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-icon v-if="authStore.user?.status === 'dnd'" name="check" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useAuthStore } from 'src/stores'
import { activityService } from 'src/services'

export default defineComponent({
  name: 'SettingsPage',

  data() {
    return {
      authStore: useAuthStore(),
    }
  },

  computed: {
    notifications: {
      get() {
        return this.authStore.user?.notifications === 'enabled' || this.authStore.user?.notifications === 'mentions'
      },
      set(value: boolean) {
        if (this.authStore.user?.notifications) {
          this.authStore.user.notifications = value ? 'enabled' : 'disabled'
          activityService.updateNotificationSettings(this.authStore.user.notifications)
        }
      },
    },

    notificationMentions: {
      get() {
        return this.authStore.user?.notifications === 'mentions'
      },
      set(value: boolean) {
        if (this.authStore.user?.notifications) {
          this.authStore.user.notifications = value ? 'mentions' : 'enabled'
          activityService.updateNotificationSettings(this.authStore.user.notifications)
        }
      },
    },

    isNotificationDisabled() {
      return this.authStore.user?.status === 'dnd'
    },

    isNotificationMentionsDisabled() {
      return this.authStore.user?.notifications === 'disabled'
    },
  },
})
</script>
