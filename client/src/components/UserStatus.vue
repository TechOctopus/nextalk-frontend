<template>
  <q-btn flat no-cap>
    <q-icon :name="userStatusIcon" :color="userStatusIconColor" size="0.8rem" class="q-mr-xs" />
    <span class="user-name">{{ fullName }}</span>
    <q-menu fit>
      <q-list>
        <q-item clickable v-close-popup @click="user.status = 'online'">
          <q-item-section avatar>
            <q-icon name="circle" color="green" />
          </q-item-section>
          <q-item-section> Online </q-item-section>
        </q-item>
        <q-item clickable v-close-popup @click="user.status = 'offline'">
          <q-item-section avatar>
            <q-icon name="do_not_disturb_off" color="grey-8" />
          </q-item-section>
          <q-item-section> Offline </q-item-section>
        </q-item>
        <q-item clickable v-close-popup @click="user.status = 'dnd'">
          <q-item-section avatar>
            <q-icon name="do_not_disturb_on" color="orange" />
          </q-item-section>
          <q-item-section> Do Not Disturb </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { user } from 'src/assets'

export default defineComponent({
  name: 'UserStatus',

  data() {
    return {
      user,
      userStatus: 'online',
    }
  },

  methods: {},

  computed: {
    fullName(): string {
      return `${this.user.firstName} ${this.user.lastName}`
    },

    userStatusIcon(): string {
      switch (this.user.status) {
        case 'online':
          return 'circle'
        case 'offline':
          return 'do_not_disturb_off'
        case 'dnd':
          return 'do_not_disturb_on'
        default:
          return 'do_not_disturb_off'
      }
    },

    userStatusIconColor(): string {
      switch (this.user.status) {
        case 'online':
          return 'green'
        case 'offline':
          return 'grey-8'
        case 'dnd':
          return 'orange'
        default:
          return 'grey-8'
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.user-name {
  text-transform: none;
  white-space: nowrap;
}
</style>
