import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/channels',
  },

  {
    path: '/channels',
    component: () => import('layouts/ChannelLayout.vue'),
    children: [
      { path: '', name: 'nochannels', component: () => import('pages/ChooseChannelPage.vue') },
      { path: ':name', name: 'channels', component: () => import('pages/ChannelPage.vue') },
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
