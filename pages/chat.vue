<template>
  <b-row>
    <b-col class="room" sm="12" md="4" lg="4">
      <b-card class="room-card">
        <b-card-title class="room-card-title"
          >Список людей в комнате</b-card-title
        >
        <b-list-group>
          <b-list-group-item
            v-for="u in users"
            :key="u.id"
            class="d-flex align-items-center"
          >
            <b-avatar
              :src="u.avatar"
              size="lg"
              class="mr-3 custom-badge"
              :badge="true"
              :badge-variant="u.online ? 'success' : 'secondary'"
            >
            </b-avatar>
            <div class="user-name">
              {{ u.name }}
            </div>
          </b-list-group-item>
        </b-list-group>
      </b-card>
    </b-col>

    <b-col class="chat" sm="12" md="8" lg="8">
      <b-card class="chat-card">
        <b-card-title class="chat-title">
          <b-icon icon="arrow-left" class="arrow-left" @click="exit"> </b-icon>
          Чат комнаты {{ user.room }}
        </b-card-title>
        <div class="chat-body">
          <div
            v-for="(message, index) in messages"
            :key="index"
            class="message"
          >
            <b-card :class="{ 'text-right': message.sender === 'me' }">
              <b-card-text>{{ message.text }}</b-card-text>
            </b-card>
          </div>
        </div>
        <div class="input-footer">
          <b-form @submit.prevent="sendMessage">
            <b-input-group>
              <b-form-input
                v-model="newMessage"
                placeholder="Введите сообщение"
              ></b-form-input>
              <b-input-group-append>
                <b-button type="submit" variant="primary">Отправить</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form>
        </div>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      messages: [],
      newMessage: '',
      users: [
        { id: 1, name: 'Alice', avatar: 'path/to/alice.jpg', online: true },
        { id: 2, name: 'Bob', avatar: 'path/to/bob.jpg', online: false },
        { id: 3, name: 'Charlie', avatar: 'path/to/charlie.jpg', online: true },
      ],
    }
  },
  // middleware: ['chat'],
  head() {
    return {
      title: `Комната ${this.user.name}`,
    }
  },
  computed: { ...mapState(['user']) },
  mounted() {
    this.$socket.on('newMessage', (data) => {
      console.log('Received message from server:', data.message)
      this.messages.push(data.message)
    })
  },
  mounted() {
    console.log('User data:', this.user) // Проверяем наличие данных
  },
  methods: {
    ...mapMutations(['clearData']),
    exit() {
      this.$router.push('/?message=left(chat)')
      this.clearData()
    },
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        this.$socket.emit('message', this.newMessage)
        this.newMessage = ''
      }
    },
  },
}
</script>

<style scoped>
/* .row {
  height: 100%;
} */
/* .chat {
  display: flex;
  flex-direction: column;
  height: 100%;
} */
.room {
  background-color: rgb(33, 33, 33);
}
.room-card {
  background-color: transparent;
}
.room-card-title {
  font-size: 1.3rem;
  color: white;
}

.list-group-item {
  background-color: transparent;
  border: 0;
}
.b-avatar {
  border: 1px solid rgb(244, 241, 241);
}
.custom-badge ::v-deep .b-avatar-badge {
  font-size: 55%;
  border: 1px solid rgb(244, 241, 241);
}
.user-name {
  color: white;
  font-size: 1.2rem;
  font-weight: thin;
}

.chat-card {
  display: flex;
  height: 100vh;
  flex-direction: column;
}

.chat-title {
  font-size: 1.3rem;
  flex: 0 0 auto; /* Не растягивается */
}

.chat-body {
  flex: 1; /* Занимает доступное пространство */
  overflow-y: auto; /* Добавляем прокрутку, если содержимое чата превышает высоту */
}

.input-footer {
  flex: 0 0 auto; /* Не растягивается */
}

/* .chat-body {
  flex-grow: 1;
  overflow-y: auto; */
/* display: flex;
  flex-direction: column; */
/* overflow-y: auto; */
/* } */

/* .messages {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid red;
} */

.message {
  margin: 5px 0;
}

.text-right {
  text-align: right;
}
</style>
./chat.vue
