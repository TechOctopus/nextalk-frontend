import { defineStore } from 'pinia'

export const useMembersStore = defineStore('members', {
  state: () => ({
    members: [],
    membersDialog: false,
  }),

  getters: {},

  actions: {},
})
