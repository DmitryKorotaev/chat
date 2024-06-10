<template>
  <b-form @submit.prevent="send">
    <b-input-group>
      <b-form-input
        v-model="text"
        placeholder="Введите сообщение"
        outline
        @keydown.enter="send"
      ></b-form-input>
      <b-input-group-append>
        <b-button type="submit" variant="primary">Отправить</b-button>
      </b-input-group-append>
    </b-input-group>
  </b-form>
</template>

<script>
export default {
  data: () => ({
    text: '',
  }),
  methods: {
    send() {
      console.log('createMessage')
      this.$socket.emit(
        'createMessage',
        {
          text: this.text,
          id: this.$store.state.user.id,
        },
        (data) => {
          if (typeof data === 'string') {
            console.error('Error processing message:', data.message)
          } else if (data.status === 'OK') {
            this.text = ''
          } else {
            console.error('Error processing message:', data.message)
          }
        }
      )
    },
  },
}
</script>
