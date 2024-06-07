export const state = () => ({
  user: {},
})

export const mutations = {
  setUser(state, user) {
    state.user = user
    console.log(user, 'setUser')
  },

  message(state, user) {
    state.user = user
  },
  clearData(state) {
    state.user = {}
  },
}

export const actions = {}
