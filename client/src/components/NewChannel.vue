<template>
  <q-form class="column" style="width: 100%">
    <div class="col">
      <q-input
        outlined
        dense
        v-model="formData.name"
        type="text"
        label="Channel Name"
        :error="v$.formData.name.$error"
        :error-message="v$.formData.name.$errors[0]?.$message"
      />
    </div>
    <div class="col">
      <q-checkbox
        dense
        class="col full-width"
        v-model="formData.isPrivate"
        label="Do you want to make this channel private?"
        :error="v$.formData.isPrivate.$error"
        :error-message="v$.formData.isPrivate.$errors[0]?.$message"
      />
    </div>
    <q-btn
      type="submit"
      label="Create channel"
      color="primary"
      class="col q-mt-md"
      size="md"
      @click="handleCreateChannel"
    />
  </q-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import useVuelidate from '@vuelidate/core'
import { minLength, maxLength, required } from '@vuelidate/validators'

import { joinChannel } from 'src/services/commands'

export default defineComponent({
  name: 'NewChannel',

  data() {
    return {
      v$: useVuelidate({ $autoDirty: true }),
      formData: {
        name: '',
        isPrivate: false,
      },
    }
  },

  validations() {
    return {
      formData: {
        name: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(14),
        },
        isPrivate: {
          required,
        },
      },
    }
  },

  methods: {
    handleCreateChannel() {
      joinChannel(this.formData.name, this.formData.isPrivate)
      this.$emit('close')
    },
  },
})
</script>
