<template>
  <q-layout>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="bg-transparent text-center text-black">
      <p>NexTalk &copy; {{ new Date().getFullYear() }}</p>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'AuthLayout',

  setup() {
    const leftDrawer = ref(false)
    return { leftDrawer }
  },
})
</script>
