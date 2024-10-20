<template>
  <div style="width: 100%">
    <q-list separator>
      <q-item class="q-px-none" v-for="command in allCommands" :key="command.commandName">
        <q-item-section>
          <q-item-label>/{{ command.commandName }}</q-item-label>
          <q-item-label caption>{{ command.description }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { allCommands } from 'src/services/commands'

export default defineComponent({
  name: 'CommandHelp',

  data() {
    return {
      allCommands,
    }
  },

  methods: {},
})
</script>
