// Inspired by https://github.com/quasarframework/quasar/blob/dev/docs/src/layouts/gallery/whatsapp.vue

<template>
  <div class="WAL position-relative" style="height: 100svh">
    <q-layout view="lHh Lpr lFf" class="WAL__layout shadow-3" container>
      <q-header elevated>
        <q-toolbar class="WAL__toolbar">
          <q-btn round flat icon="keyboard_arrow_left" class="WAL__drawer-open q-mr-sm" @click="toggleLeftDrawer" />
          <span class="q-subtitle-1 q-pl-md">{{ channelsStore.currentChannel?.name ?? 'No channel selected' }}</span>
          <q-space />
          <q-btn round flat icon="info" />
        </q-toolbar>
      </q-header>

      <q-drawer v-model="leftDrawerOpen" show-if-above bordered :breakpoint="690">
        <q-toolbar class="WAL__toolbar">
          <span class="q-subtitle-1 q-pl-md"> Jon Doe </span>

          <q-space />

          <q-btn round flat icon="message" />

          <q-btn round flat icon="more_vert">
            <q-menu auto-close :offset="[110, 8]">
              <q-list style="min-width: 150px">
                <q-item clickable>
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

        <q-toolbar>
          <q-input rounded outlined dense class="WAL__field full-width" v-model="search" placeholder="Search channels">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-toolbar>

        <q-scroll-area style="height: calc(100% - 100px)">
          <q-list>
            <q-item
              v-for="channel in channelsStore.channels"
              :key="channel.id"
              @click="handleChooseChannel(channel.name)"
              clickable
              v-ripple
            >
              <q-item-section>
                <q-item-label>
                  <span lass="q-subtitle-1 q-pl-md"> {{ channel.name }} </span>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container class="bg-grey-1">
        <router-view :key="channelsStore.currentChannel?.id" />
      </q-page-container>

      <q-footer>
        <q-toolbar class="bg-secondary text-black row">
          <q-input
            rounded
            outlined
            dense
            class="WAL__field col-grow q-mr-sm"
            bg-color="white"
            v-model="message"
            placeholder="Type a message"
          />
          <q-btn round flat icon="send" />
        </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useChannelStore } from 'src/stores/channels'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'ChannelLayout',

  data() {
    return {
      channelsStore: useChannelStore(),
      message: '',
      leftDrawerOpen: false,
      search: '',
      router: useRouter(),
    }
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },

    handleChooseChannel(channelName: string) {
      this.search = ''
      this.router.push(`/channels/${channelName}`)
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
