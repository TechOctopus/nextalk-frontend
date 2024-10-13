import { defineStore } from 'pinia'
import type { UserStatus } from 'src/types'

import { user } from 'src/assets'

export const useUserStore = defineStore('user', {
  state: () => ({
    user,
  }),

  getters: {
    getFullName(): string {
      return `${this.user.firstName} ${this.user.lastName}`
    },
  },

  actions: {
    setUserStatus(status: UserStatus) {
      if (status === 'dnd') {
        this.user.notifications = 'disabled'
      } else {
        this.user.notifications = 'enabled'
      }
      this.user.status = status
    },
  },
})
