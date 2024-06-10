<template>
  <b-row>
    <Room />
    <b-col sm="12" md="8" lg="8">
      <b-card class="chat-card">
        <b-card-title class="chat-title">
          <b-icon icon="arrow-left" class="arrow1" @click="exit"> </b-icon>
          Чат комнаты {{ user.room }}
        </b-card-title>
        <b-card class="chat-card">
          <div class="chat-body">
            <div class="chat">
              <Message
                v-for="m in messages"
                :key="m.id"
                :name="m.name"
                :text="m.text"
                owner
              />
            </div>
          </div>
        </b-card>

        <div class="input-footer">
          <ChatForm />
        </div>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {}
  },
  middleware: ['chat'],
  head() {
    return {
      title: `Комната ${this.user.name}`,
    }
  },
  computed: {
    ...mapState(['user', 'messages']),
  },

  mounted() {
    console.log('User data:', this.user) // Проверяем наличие данных
    console.log(this.messages, 'messages state')
  },
  methods: {
    ...mapMutations(['clearData']),
    exit() {
      this.$router.push('/?message=left(chat)')
      this.clearData()
    },
  },
}
</script>

<style scoped>
.row,
.chat-card {
  background-color: #333232;
}
.chat-card {
  display: flex;
  height: 100vh;
  flex-direction: column;
  border: 0;
}
/* .chat-card {
  height: 100%;
  position: relative;
  overflow: hidden;
} */
.chat {
  top: 0;
  right: 0;
  left: 0;
  bottom: 80px;
  padding: 1rem;
  overflow-y: auto;
  border: 0;
}
.input-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  height: 80px;
  background: #212121;
}

.chat-title {
  font-size: 1.3rem;
  flex: 0 0 auto; /* Не растягивается */
}
.card-body {
  border: 0;
}

.chat-body {
  flex: 1; /* Занимает доступное пространство */
  overflow-y: auto; /* Добавляем прокрутку, если содержимое чата превышает высоту */
}
.arrow1 :hower {
  color: gray;
}

.message {
  margin: 5px 0;
}

.text-right {
  text-align: right;
}
</style>
./chat.vue
