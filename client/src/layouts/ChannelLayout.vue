// Inspired by https://github.com/quasarframework/quasar/blob/dev/docs/src/layouts/gallery/whatsapp.vue

<template>
  <div class="WAL position-relative" style="height: 100svh">
    <q-layout view="lHh Lpr lFf" class="WAL__layout shadow-3" container>
      <q-header elevated>
        <q-toolbar class="WAL__toolbar">
          <q-btn round flat icon="keyboard_arrow_left" class="WAL__drawer-open q-mr-sm" @click="toggleLeftDrawer" />
          <span class="q-subtitle-1 q-pl-md">{{ channelsStore.currentChannel?.name ?? 'No channel selected' }}</span>
          <q-space />
          <template v-if="channelsStore.currentChannel">
            <q-btn round flat icon="info" @click="showInfoDialog = true" />
            <dialog-wrapper v-model="showInfoDialog" title="Channel info">
              <channel-info @close="showInfoDialog = false" />
            </dialog-wrapper>
          </template>
        </q-toolbar>
      </q-header>

      <q-drawer v-model="leftDrawerOpen" show-if-above bordered :breakpoint="690">
        <q-toolbar class="WAL__toolbar">
          <span class="q-subtitle-1 q-pl-md">{{ fullName }}</span>

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
                <q-item clickable>
                  <q-item-section>Logout</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

          <q-btn round flat icon="close" class="WAL__drawer-close" @click="toggleLeftDrawer" />
        </q-toolbar>

        <channels-list />
      </q-drawer>

      <q-page-container class="bg-grey-1">
        <router-view :key="channelsStore.currentChannel?.id" />
      </q-page-container>

      <q-footer>
        <command-line />
      </q-footer>
    </q-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useChannelStore } from 'src/stores/channels'
import { user } from 'src/assets'

import ChannelInfo from 'src/components/ChannelInfo.vue'
import DialogWrapper from 'src/components/DialogWrapper.vue'
import NewChannel from 'src/components/NewChannel.vue'
import ChannelsList from 'src/components/ChannelsList.vue'
import CommandLine from 'src/components/CommandLine.vue'

export default defineComponent({
  name: 'ChannelLayout',

  components: {
    CommandLine,
    DialogWrapper,
    ChannelInfo,
    NewChannel,
    ChannelsList,
  },

  data() {
    return {
      channelsStore: useChannelStore(),
      leftDrawerOpen: false,
      showInfoDialog: false,
      showNewChannelDialog: false,
      user,
    }
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
  },

  computed: {
    fullName(): string {
      return `${this.user.firstName} ${this.user.lastName}`
    },
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
