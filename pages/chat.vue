<template>
  <div v-if="loading" class="loading-screen">Loading...</div>
  <div v-else>
    <b-row>
      <Room />
      <b-col sm="12" md="8" lg="8">
        <b-card class="chat-card">
          <b-card-title class="chat-title" ref="chatTitle">
            <b-icon icon="arrow-left" class="arrow1" @click="exit"> </b-icon>
            Чат комнаты {{ user.room }}
          </b-card-title>

          <div class="chat-body" @scroll="handleScroll">
            <div class="chat">
              <Message
                v-for="(m, index) in messages"
                :key="index"
                :name="m.name"
                :text="m.text"
                :owner="m.id === user.id"
              />
            </div>
          </div>
        </b-card>
        <div class="input-footer">
          <ChatForm />
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  middleware: ['chat'],
  head() {
    return {
      title: `Комната ${this.user.name}`,
    }
  },
  computed: {
    ...mapState(['user', 'messages', 'loading']),
    ...mapMutations(['setLoading']),
  },

  mounted() {
    const savedUserString = localStorage.getItem('user')
    const savedUser = JSON.parse(savedUserString)
    if (savedUser) {
      this.$store.commit('setUser', savedUser) // Использование мутации для установки пользователя
      this.$socket.emit('userJoined', savedUser, (data) => {
        if (typeof data !== 'string') {
          const updatedUser = { ...savedUser, id: data.userId }
          this.$store.commit('setUser', updatedUser)
          localStorage.setItem('user', JSON.stringify(updatedUser))
        }
      })
    }

    const savedMessages = localStorage.getItem('messages')
    if (savedMessages) {
      this.$store.commit('setMessages', JSON.parse(savedMessages))
    }

    this.$store.commit('setLoading', false)

    this.$socket.on('loadMessages', (loadedMessages) => {
      // this.setMessages(loadedMessages)
      this.$store.commit('setMessages', loadedMessages)
    })

    this.$socket.on('newMessage', (message) => {
      this.$store.commit('SOCKET_newMessage', message)
    })

    this.$socket.on('updateUsers', (users) => {
      this.$store.commit('SOCKET_updateUsers', users)
    })
  },

  watch: {
    user: {
      handler(newUser) {
        //localStorage.setItem('key', value)
        localStorage.setItem('user', JSON.stringify(newUser))
      },
      deep: true,
    },
    messages: {
      handler(newMessages) {
        localStorage.setItem('messages', JSON.stringify(newMessages))
      },
      deep: true,
    },
  },

  methods: {
    ...mapMutations(['clearData', 'setUser', 'setMessages']),
    exit() {
      this.$socket.emit('userLeft', this.user.id, () => {
        this.$router.push('/?message=left(chat)')
        this.clearData()
        localStorage.removeItem('user')
        localStorage.removeItem('messages')
      })
    },
    handleScroll() {
      const chatBody = this.$refs.chatTitle
      const scrollTop = chatBody.scrollTop
      chatBody.style.padding = scrollTop > 0 ? '0.5rem' : '1rem'
    },
  },
}
</script>

<style scoped>
.chat-title {
  color: white;
  font-size: 1.3rem;
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 1rem;
  transition: padding 0.3s;
}
.chat-card {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  border: 0;
}
.chat-body {
  flex: 1;
  overflow-y: auto;
}
.chat {
  padding: 1rem;
}
.input-footer {
  margin-top: auto;
  padding: 1rem;
  height: 80px;
  background: #292929;
  border-radius: 10px 10px 0 0;
  position: sticky; /* Делаем поле ввода "липким" */
  bottom: 0; /* Прикрепляем поле ввода к низу контейнера */
  z-index: 10; /* Устанавливаем высокий z-index для гарантии, что поле ввода будет над содержимым */
}

.card-body {
  border: 0;
}

.arrow1 :hower {
  color: gray;
}
.loading-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
}
</style>
./chat.vue
