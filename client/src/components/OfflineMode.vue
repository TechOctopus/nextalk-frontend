<template>
  <q-page>
    <div class="q-pa-md container">
      <q-icon name="cloud_off" size="8rem" />
      <h4>Offline mode</h4>
      <p class="text-center">You are currently offline. Please check your internet connection before continuing.</p>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'OfflineMode',

  data() {
    return {}
  },
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  justify-items: center;
  height: 100%;
}
</style>
