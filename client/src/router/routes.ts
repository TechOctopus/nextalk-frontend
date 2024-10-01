import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/channels',
    component: () => import('layouts/ChannelLayout.vue'),
    children: [{ path: ':id', name: 'channels', component: () => import('pages/ChannelPage.vue') }],
  },

  {
    path: '/',
    meta: { requiresAuth: false },
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: 'login', name: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'register', component: () => import('pages/RegisterPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
