<template>
  <q-page padding class="q-pa-md row justify-center items-center">
    <section style="width: 100%; height: 100%; display: flex; align-items: center; flex-direction: column">
      <p class="text-h6 q-pb-md text-center" style="max-width: 400px">Create a new channel to start messaging</p>
      <div style="width: 100%; max-width: 400px">
        <new-channel />
      </div>
    </section>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NewChannel from 'src/components/NewChannel.vue'

export default defineComponent({
  name: 'ChooseChannelPage',

  components: {
    NewChannel,
  },
})
</script>
