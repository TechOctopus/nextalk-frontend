<template>
  <q-page class="flex flex-center">
    <q-card class="q-ma-md" style="width: 400px" flat>
      <q-card-section align="center">
        <q-form @submit.stop="register" class="q-gutter-y-md">
          <h1 class="text-h5">Sign up</h1>
          <div class="row q-gutter-x-md">
            <q-input outlined class="col" v-model="formData.firstName" label="First Name *" />
            <q-input outlined class="col" v-model="formData.lastName" label="Last Name *" />
          </div>
          <q-input outlined v-model="formData.email" type="email" label="Email *" />
          <q-input outlined v-model="formData.username" label="Username *" />
          <q-input outlined v-model="formData.password" :type="isPwd ? 'password' : 'text'" label="Password *">
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>
          <q-input
            outlined
            v-model="formData.confirmPassword"
            :type="isPwd ? 'password' : 'text'"
            label="Confirm Password *"
          >
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>
          <q-btn type="submit" label="Sign up" color="primary" class="full-width" size="md" />
        </q-form>
        <div class="q-pt-md">
          <router-link class="text-primary" to="/login">Already have an account?</router-link>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'RegisterPage',
  data() {
    return {
      router: useRouter(),
      isPwd: true,
      formData: {
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
        firstName: '',
        lastName: '',
      },
    }
  },
  methods: {
    async register() {
      this.router.push('/channels/1')
    },
  },
})
</script>
