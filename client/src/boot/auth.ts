import { boot } from 'quasar/wrappers'
import { authService } from 'src/services/auth'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
  }
}

export default boot(({ router }) => {
  router.beforeEach(async (to, from, next) => {
    const isAuthenticated = await authService.checkAuth()

    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!isAuthenticated) {
        return next({ name: 'login' })
      }
    } else if (to.matched.some((record) => !record.meta.requiresAuth)) {
      if (isAuthenticated) {
        return next({ name: 'nochannels' })
      }
    }
    next()
  })
})
