<template>
  <div class="center-card">
    <b-card class="custom-card">
      <b-card-title class="title-card"> Nuxt Chat </b-card-title>
      <div class="form-input">
        <b-form @submit.prevent="onSubmit" v-if="show">
          <b-form-group id="input-group-2">
            <b-form-input
              id="input-2"
              v-model="user.name"
              placeholder="Введите имя"
              required
              class="custom-input"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3">
            <b-form-input
              id="input-3"
              v-model="user.room"
              placeholder="Введите комнату"
              required
              class="custom-input"
            ></b-form-input>
          </b-form-group>
          <div class="submit-form">
            <b-button type="submit">Войти</b-button>
          </div>
        </b-form>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      </div>
    </b-card>
  </div>
</template>

<script>
// import { mapMutations, mapState } from 'vuex'

export default {
  head: {
    title: 'Добро пожаловать в Nuxt чат',
  },
  data() {
    return {
      user: {
        name: '',
        room: '',
      },
      show: true,
      errorMessage: '',
    }
  },

  mounted() {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      this.$store.commit('setUser', JSON.parse(savedUser))
      this.$router.push('/chat')
    } else {
      this.$router.push('/')
    }
  },

  methods: {
    onSubmit() {
      if (!this.user.name || !this.user.room) {
        console.error('Введите имя и комнату')
        return
      }
      this.checkUserName(this.user.name, this.user.room)
    },
    checkUserName(name, room) {
      this.$socket.emit('checkUserName', { name, room }, (isNameTaken) => {
        if (isNameTaken) {
          this.errorMessage = 'Имя пользователя уже занято в этой комнате'
          return
        }
        this.connectUser()
      })
    },
    connectUser() {
      if (this.$socket.connected) {
        this.sendUserJoined()
      } else {
        this.$socket.once('connect', () => {
          this.sendUserJoined()
        })
      }
    },
    sendUserJoined() {
      this.$socket.emit('userJoined', this.user, (data) => {
        if (typeof data === 'string') {
          console.error(data)
        } else {
          this.user.id = data.userId
          this.$store.commit('setUser', this.user)
          localStorage.setItem('user', JSON.stringify(this.user))
          this.$router.push('/chat')
        }
      })
    },
  },
}
</script>

<style scoped>
.center-card {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.custom-card {
  width: 100%;
  max-width: 400px;
  padding: 20px;
}
.form-input {
  padding: 0.5rem;
}
.title-card {
  text-align: center;
  font-weight: 700;
  font-size: 2rem;
  color: white;
}
.submit-form {
  display: flex;
  justify-content: center;
  padding: 1rem 0;
}
.btn-secondary,
.btn-secondary:hover,
.btn-secondary:focus,
.btn-secondary:active {
  color: white;
  background-color: #19191b !important;
  border: 1px solid #898989 !important;
  box-shadow: none !important;
}

.error-message {
  color: red;
  margin-top: 10px;
  font-size: 0.8rem;
  text-align: center;
}
</style>
