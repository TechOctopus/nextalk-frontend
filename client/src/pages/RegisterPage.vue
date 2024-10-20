<template>
  <q-page class="flex flex-center">
    <q-card class="q-ma-md" style="width: 400px" flat>
      <q-card-section align="center">
        <q-form @submit.stop="register" class="q-gutter-y-md">
          <h1 class="text-h5">Sign up</h1>
          <div class="row q-gutter-x-md">
            <q-input
              outlined
              class="col"
              v-model="formData.firstName"
              label="First Name *"
              :error="v$.formData.firstName.$error"
              :error-message="v$.formData.firstName.$errors[0]?.$message"
            />
            <q-input
              outlined
              class="col"
              v-model="formData.lastName"
              label="Last Name *"
              :error="v$.formData.lastName.$error"
              :error-message="v$.formData.lastName.$errors[0]?.$message"
            />
          </div>
          <q-input
            outlined
            v-model="formData.email"
            type="email"
            label="Email *"
            :error="v$.formData.email.$error"
            :error-message="v$.formData.email.$errors[0]?.$message"
          />
          <q-input
            outlined
            v-model="formData.username"
            label="Username *"
            :error="v$.formData.username.$error"
            :error-message="v$.formData.username.$errors[0]?.$message"
          />
          <q-input
            outlined
            v-model="formData.password"
            :type="isPwd ? 'password' : 'text'"
            label="Password *"
            :error="v$.formData.password.$error"
            :error-message="v$.formData.password.$errors[0]?.$message"
          >
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>
          <q-input
            outlined
            v-model="formData.confirmPassword"
            :type="isPwd ? 'password' : 'text'"
            label="Confirm Password *"
            :error="v$.formData.confirmPassword.$error"
            :error-message="v$.formData.confirmPassword.$errors[0]?.$message"
          >
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>
          <q-btn type="submit" label="Sign up" color="primary" class="full-width" size="md" :loading="loading">
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
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
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import useVuelidate from '@vuelidate/core'
import { minLength, maxLength, required, email as emailValidator, sameAs } from '@vuelidate/validators'

export default defineComponent({
  name: 'RegisterPage',
  data() {
    return {
      isPwd: true,
      formData: {
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
        firstName: '',
        lastName: '',
      },
      v$: useVuelidate({ $autoDirty: true }),
      q$: useQuasar(),
      router: useRouter(),
      loading: false,
    }
  },
  validations() {
    // Size limits are based on the UK government's GDS Catalogue
    // https://webarchive.nationalarchives.gov.uk/ukgwa/+/http://www.cabinetoffice.gov.uk/media/254290/GDS%20Catalogue%20Vol%202.pdf
    return {
      formData: {
        firstName: { required, minLength: minLength(3), maxLength: maxLength(35) },
        lastName: { required, minLength: minLength(3), maxLength: maxLength(35) },
        email: { required, emailValidator },
        username: { required, minLength: minLength(3), maxLength: maxLength(20) },
        password: { required, minLength: minLength(8), maxLength: maxLength(16) },
        confirmPassword: { required, sameAsPassword: sameAs(this.formData.password) },
      },
    }
  },
  methods: {
    async register() {
      this.loading = true
      const isValid = await this.v$.$validate()
      if (!isValid) {
        this.q$.notify({ message: 'Please fill in the required fields', color: 'negative', position: 'top' })
        this.loading = false
        return
      }
      this.q$.notify({ message: 'Account created successfully', color: 'positive', position: 'top' })
      this.router.push('/login')
      this.loading = false
    },
  },
})
</script>
