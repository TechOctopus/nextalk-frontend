<template>
  <q-page class="row items-center justify-evenly">
    <q-card class="q-ma-md" style="width: 400px" flat>
      <q-card-section align="center">
        <q-form @submit.stop="login" class="q-gutter-y-md">
          <h1 class="text-h5">Sign in</h1>
          <q-input outlined v-model="formData.email" label="email" type="email" />
          <q-input outlined v-model="formData.password" :type="isPwd ? 'password' : 'text'" label="password">
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>
          <q-btn type="submit" label="Sign in" color="primary" class="full-width" size="md" />
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
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LoginPage',
  data() {
    return {
      router: useRouter(),
      isPwd: true,
      formData: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async login() {
      this.router.push('/channels/1')
    },
  },
})
</script>
