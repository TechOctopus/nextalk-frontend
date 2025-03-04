// Inspired by https://github.com/quasarframework/quasar/blob/dev/docs/src/layouts/gallery/whatsapp.vue

<template>
  <div class="WAL position-relative" style="height: 100svh">
    <q-layout view="lHh Lpr lFf" class="WAL__layout shadow-3" container>
      <q-header elevated>
        <q-toolbar class="WAL__toolbar">
          <q-btn round flat icon="keyboard_arrow_left" class="WAL__drawer-open q-mr-sm" @click="toggleLeftDrawer" />
          <span class="q-subtitle-1 q-pl-md ellipsis">{{ channelsStore.active?.name }}</span>
          <q-space />
          <template v-if="channelsStore.active">
            <q-btn round flat icon="info" @click="membersStore.membersDialog = true" />
            <dialog-wrapper v-model="membersStore.membersDialog" title="Channel info" maxWidth="400px">
              <channel-info @close="membersStore.membersDialog = false" />
            </dialog-wrapper>
          </template>
        </q-toolbar>
      </q-header>

      <q-drawer v-model="leftDrawerOpen" show-if-above bordered :breakpoint="690">
        <q-toolbar class="WAL__toolbar">
          <user-status />

          <q-space />

          <q-btn round flat icon="chat" @click="showNewChannelDialog = true" />
          <dialog-wrapper v-model="showNewChannelDialog" title="New channel" maxWidth="400px">
            <new-channel @close="showNewChannelDialog = false" />
          </dialog-wrapper>

          <q-btn round flat icon="more_vert">
            <q-menu auto-close :offset="[110, 8]">
              <q-list style="min-width: 150px">
                <q-item clickable @click="showNewChannelDialog = true">
                  <q-item-section>New channel</q-item-section>
                </q-item>
                <q-item clickable @click="logout">
                  <q-item-section>Logout</q-item-section>
                </q-item>
                <q-item clickable to="/channels/settings">
                  <q-item-section>Settings</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

          <q-btn round flat icon="close" class="WAL__drawer-close" @click="toggleLeftDrawer" />
        </q-toolbar>

        <channels-list />
      </q-drawer>

      <q-page-container class="bg-grey-1">
        <div v-if="isOffline"><offline-mode /></div>
        <router-view v-else :key="channelsStore.active?.name ?? ''" />
      </q-page-container>

      <q-footer>
        <command-line />
      </q-footer>
    </q-layout>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'

import { defineComponent } from 'vue'
import { useChannelStore } from 'src/stores/channels'
import { useMembersStore } from 'src/stores/members'
import { useAuthStore } from 'src/stores/auth'

import ChannelInfo from 'src/components/ChannelInfo.vue'
import DialogWrapper from 'src/components/DialogWrapper.vue'
import NewChannel from 'src/components/NewChannel.vue'
import ChannelsList from 'src/components/ChannelsList.vue'
import CommandLine from 'src/components/CommandLine.vue'
import UserStatus from 'src/components/UserStatus.vue'
import OfflineMode from 'src/components/OfflineMode.vue'

export default defineComponent({
  name: 'ChannelLayout',

  components: {
    CommandLine,
    DialogWrapper,
    ChannelInfo,
    NewChannel,
    ChannelsList,
    UserStatus,
    OfflineMode,
  },

  data() {
    return {
      leftDrawerOpen: false,
      showNewChannelDialog: false,
      router: useRouter(),
      membersStore: useMembersStore(),
      channelsStore: useChannelStore(),
      authStore: useAuthStore(),
      isOffline: false,
    }
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },

    async logout() {
      await this.authStore.logout()
      this.router.push('/login')
    },

    handleNetworkChange() {
      this.isOffline = !navigator.onLine
      this.authStore.setUserStatus(this.isOffline ? 'offline' : 'online')
    },
  },

  mounted() {
    this.channelsStore.loadChannels()

    window.addEventListener('offline', this.handleNetworkChange)
    window.addEventListener('online', this.handleNetworkChange)
  },

  beforeUnmount() {
    window.removeEventListener('offline', this.handleNetworkChange)
    window.removeEventListener('online', this.handleNetworkChange)
  },
})
</script>

<style lang="scss">
.WAL {
  width: 100%;
  height: 100%;
  padding-top: 20px;
  padding-bottom: 20px;

  &:before {
    content: '';
    height: 127px;
    position: fixed;
    top: 0;
    width: 100%;
    background-color: $primary;
  }

  &__layout {
    margin: 0 auto;
    z-index: 4000;
    height: 100%;
    width: 90%;
    max-width: 950px;
    border-radius: 5px;
  }

  .q-drawer--standard .WAL__drawer-close {
    display: none;
  }

  &__toolbar {
    background-color: $secondary;
    color: $dark;
  }

  @media (max-width: 850px) {
    padding: 0;

    &__layout {
      width: 100%;
      border-radius: 0;
    }
  }

  @media (min-width: 691px) {
    &__drawer-open {
      display: none;
    }
  }
}
</style>
