import { defineStore } from 'pinia'
import type { UserStatus, User } from 'src/contracts'

export const useUserStore = defineStore('user', {
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
