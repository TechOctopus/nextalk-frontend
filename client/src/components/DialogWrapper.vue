<template>
  <q-dialog v-model="show">
    <q-card :style="{ maxWidth, width: '100%' }">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ title }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <slot />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'DialogWrapper',

  props: {
    title: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Boolean,
      required: true,
    },
    maxWidth: {
      type: String,
      default: '500px',
    },
  },

  computed: {
    show: {
      get() {
        return this.modelValue
      },
      set(value: boolean) {
        this.$emit('update:modelValue', value)
      },
    },
  },
})
</script>
