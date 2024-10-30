<template>
  <q-page class="row items-center justify-evenly">
    <q-card class="q-ma-md" style="width: 400px" flat>
      <q-card-section align="center">
        <q-form @submit.stop="login" class="q-gutter-y-md">
          <h1 class="text-h5">Sign in</h1>
          <q-input
            outlined
            v-model="formData.email"
            label="email"
            type="email"
            :error="v$.formData.email.$error"
            :error-message="v$.formData.email.$errors[0]?.$message"
          />
          <q-input
            outlined
            v-model="formData.password"
            :type="isPwd ? 'password' : 'text'"
            label="password"
            :error="v$.formData.password.$error"
            :error-message="v$.formData.password.$errors[0]?.$message"
          >
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>
          <q-btn type="submit" label="Sign in" color="primary" class="full-width" size="md" :loading="loading">
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
        </q-form>
        <div class="q-pt-md">
          <router-link class="text-primary" to="/register">Don't have an account?</router-link>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import useVuelidate from '@vuelidate/core'
import { useRouter } from 'vue-router'
import { minLength, maxLength, required, email as emailValidator } from '@vuelidate/validators'
import { useAuthStore } from 'src/stores/auth'

export default defineComponent({
  name: 'LoginPage',
  data() {
    return {
      router: useRouter(),
      v$: useVuelidate({ $autoDirty: true }),
      q$: useQuasar(),
      isPwd: true,
      formData: {
        email: '',
        password: '',
      },
      loading: false,
      authStore: useAuthStore(),
    }
  },
  validations() {
    return {
      formData: {
        email: { required, email: emailValidator },
        password: { required, minLength: minLength(8), maxLength: maxLength(16) },
      },
    }
  },
  methods: {
    async login() {
      this.loading = true
      const isValid = await this.v$.$validate()
      if (!isValid) {
        this.q$.notify({ message: 'Please fill in the required fields', color: 'negative', position: 'top' })
        this.loading = false
        return
      }

      const response = await this.authStore.login(this.formData)
      if (response.error) {
        this.q$.notify({ message: response.message, color: 'negative', position: 'top' })
        this.loading = false
        return
      }

      this.loading = false
      this.router.push('/channels')
    },
  },
})
</script>
