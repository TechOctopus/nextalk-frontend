import { AxiosError } from 'axios'
import { api } from 'boot/axios'

import { LocalStorage } from 'quasar'

import { getError } from 'src/utils'
import { useUserStore } from 'src/stores/user'

const userStore = useUserStore()

class AuthService {
  async login(payload: unknown) {
    return await api
      .post('/auth/login', payload)
      .then((response) => {
        if (response.status === 200) {
          LocalStorage.set('token', response.data.token)
          userStore.setUser(response.data.user)

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
          message: getError(error),
          error: true,
        }
      })
  }

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
          message: getError(error),
          error: true,
        }
      })
  }

  async logout() {
    await api.post('/auth/logout')
    LocalStorage.remove('token')
    userStore.setUser(null)
  }

  async checkAuth() {
    try {
      const response = await api.get('/auth/check-auth')
      if (response.status === 200) {
        userStore.setUser(response.data)
        return true
      }
      return false
    } catch (_) {
      return false
    }
  }
}

export const authService = new AuthService()
