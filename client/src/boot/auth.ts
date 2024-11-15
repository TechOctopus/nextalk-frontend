import { boot } from 'quasar/wrappers'
import { useAuthStore } from 'src/stores'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
  }
}

export default boot(({ router, store }) => {
  router.beforeEach(async (to, from, next) => {
    const isAuthenticated = await useAuthStore(store).check()

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
