import { defineStore } from 'pinia'
import { Member } from 'src/contracts'
import { channelService } from 'src/services'
import { useChannelStore } from 'src/stores/channels'

export const useMembersStore = defineStore('members', {
  state: () => ({
    members: [] as Member[],
    membersDialog: false,
  }),

  getters: {
    getMembers: (state) => state.members,
  },

  actions: {
    async loadMembers() {
      const channel = useChannelStore().active
      if (!channel) return
      this.members = await channelService.listUsers(channel.id)
    },
  },
})
