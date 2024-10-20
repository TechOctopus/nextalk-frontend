import { defineStore } from 'pinia'
import type { UserStatus } from 'src/types'

import { user } from 'src/assets'

export const useUserStore = defineStore('user', {
  state: () => ({
    user,
  }),

  getters: {
    getFullName(): string {
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
