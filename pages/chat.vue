<template>
  <b-row>
    <Room />
    <b-col sm="12" md="8" lg="8">
      <b-card class="chat-card">
        <b-card-title class="chat-title">
          <b-icon icon="arrow-left" class="arrow1" @click="exit"> </b-icon>
          Чат комнаты {{ user.room }}
        </b-card-title>

        <div class="chat-body">
          <div class="chat">
            <Message
              v-for="m in messages"
              :key="m.text"
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
  background-color: rgb(44, 45, 47);
}
.chat-title {
  color: white;
  font-size: 1.3rem;
  flex: 0 0 auto; /* Не растягивается */
}
.chat-card {
  height: 100vh;
  border: 0;
}
.chat-body {
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* Добавляем прокрутку, если содержимое чата превышает высоту */
}
.chat {
  padding: 1rem;
  overflow-y: auto;
  border: 0;
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

.message {
  margin: 5px 0;
}

.text-right {
  text-align: right;
}
</style>
./chat.vue
