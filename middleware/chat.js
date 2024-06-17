export default function ({ store, redirect, route }) {
  if (process.client) {
    if (!Object.keys(store.state.user).length && route.name !== '/') {
      redirect('/?message=noUser')
    }
  }
}
