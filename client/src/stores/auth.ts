import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'
import { AxiosError } from 'axios'
import { api } from 'boot/axios'
import type { User } from 'src/contracts'

export const useAuthStore = defineStore('auth', {
  state: () =>
    ({
      user: null,
    }) as {
      user: User | null
    },

  getters: {
    getUser(): User | null {
      return this.user
    },
  },

  actions: {
    async register(payload: unknown) {
      return await api
        .post('/auth/register', payload)
        .then((response) => {
          if (response.status === 201) {
            return {
              message: 'User created successfully',
              error: false,
            }
          }
          return {
            message: 'Something went wrong',
            error: true,
          }
        })
        .catch((error: AxiosError) => {
          return {
            message: error.message,
            error: true,
          }
        })
    },

    async login(payload: unknown) {
      return await api
        .post('/auth/login', payload)
        .then((response) => {
          if (response.status === 200) {
            LocalStorage.set('token', response.data.token)
            return {
              message: 'Login successful',
              error: false,
            }
          }
          return {
            message: 'Something went wrong',
            error: true,
          }
        })
        .catch((error: AxiosError) => {
          return {
            message: error.message,
            error: true,
          }
        })
    },

    async logout(): Promise<void> {
      await api.post('/auth/logout')
      LocalStorage.remove('token')
    },

    async checkAuthentication(): Promise<boolean> {
      try {
        const response = await api.get('/auth/check-auth')
        if (response.status === 200) {
          this.user = response.data
          return true
        }
        return false
      } catch (_) {
        return false
      }
    },
  },
})
