<template>
  <q-page padding class="q-pa-md row justify-center items-center">
    <section style="width: 100%; height: 100%; display: flex; align-items: center; flex-direction: column">
      <p class="text-h6 q-pb-md text-center" style="max-width: 400px">Create a new channel to start messaging</p>
      <div style="width: 100%; max-width: 400px">
        <q-form class="column q-gutter-y-md">
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
          <q-btn type="submit" label="Create channel" color="primary" class="col q-mt-md" size="md" />
        </q-form>
      </div>
    </section>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import useVuelidate from '@vuelidate/core'
import { minLength, maxLength, required } from '@vuelidate/validators'

export default defineComponent({
  name: 'ChooseChannelPage',

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
          maxLength: maxLength(30),
        },
        isPrivate: {
          required,
        },
      },
    }
  },
})
</script>
