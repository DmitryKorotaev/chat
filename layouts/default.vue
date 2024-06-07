<!-- <template>
  <b-container fluid>
    <b-card class="chat-card">
      <b-row>
        <b-col class="room" sm="12" md="4" lg="4"> </b-col>
        <b-col class="chat" sm="12" md="6" lg="8">
          <b-card-title class="room-title">
            Чат комнаты{{ user.room }}
          </b-card-title>
          <main>
            <Nuxt />
          </main>
        </b-col>
      </b-row>
    </b-card>
    <b-row>
      <b-col> </b-col>
      <b-col class="chat-col">
        <b-card class="chat-card"> </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState(['user']),
}
</script>

<style>
.container-fluid {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
}
.chat-card {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
}

.chat-col {
  display: flex;
  flex-direction: column;


}
</style> -->

<template>
  <b-container fluid>
    <main class="main">
      <nuxt />
    </main>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      messages: [],
      newMessage: '',
    }
  },
  computed: mapState(['user']),
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        // Логика отправки сообщения
        this.messages.push({ text: this.newMessage, sender: 'me' })
        this.newMessage = ''
      }
    },
  },
}
</script>

<style scoped>
.container-fluid {
  height: 100%;
}
</style>
