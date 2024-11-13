import { defineStore } from 'pinia'
import type { UserStatus, User, RegisterData, LoginCredentials } from 'src/contracts'
import { authService, authManager } from 'src/services'
import { useChannelStore } from 'src/stores/channels'

export const useAuthStore = defineStore('auth', {
  state: () =>
    ({
      user: null,
    }) as {
      user: User | null
    },

  getters: {
    getFullName(): string {
      if (!this.user) return ''

      let { firstName, lastName } = this.user
      if (`${firstName} ${lastName}`.length > 22) {
        if (firstName.length > 8) {
          firstName = `${firstName.slice(0, 8)}...`
        }
        if (lastName.length > 8) {
          lastName = `${lastName.slice(0, 8)}...`
        }
      }
      return `${firstName} ${lastName}`
    },
  },

  actions: {
    async check() {
      this.user = await authService.me()
      return this.user !== null
    },

    async register(form: RegisterData) {
      await authService.register(form)
    },

    async login(credentials: LoginCredentials) {
      const apiToken = await authService.login(credentials)
      // save api token to local storage and notify listeners
      authManager.setToken(apiToken.token)
      return apiToken
    },

    async logout() {
      await authService.logout()
      // remove api token and notify listeners
      authManager.removeToken()
      await useChannelStore().quitChannels()
    },

    setUser(user: User | null) {
      this.user = user
    },

    setUserStatus(status: UserStatus) {
      if (!this.user) return
      if (status === 'dnd') {
        this.user.notifications = 'disabled'
      } else {
        this.user.notifications = 'enabled'
      }
      this.user.status = status
    },
  },
})
