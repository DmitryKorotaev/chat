import Vue from 'vue'
export const state = () => ({
  user: {},
  messages: [],
  users: [],
  loading: true,
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setMessages(state, messages) {
    // state.messages = messages
    Vue.set(state, 'messages', messages)
  },
  clearData(state) {
    state.user = {}
    state.messages.length = 0
    state.users.length = 0
  },
  SOCKET_newMessage(state, message) {
    // Убедимся, что state.messages всегда является массивом
    if (!Array.isArray(state.messages)) {
      Vue.set(state, 'messages', [])
    }
    state.messages.push(message)
  },
  SOCKET_updateUsers(state, users) {
    state.users = users
    console.log(users, 'users')
  },
  setLoading(state, loading) {
    state.loading = loading
  },
}
