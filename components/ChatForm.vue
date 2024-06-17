<template>
  <b-form @submit.prevent="send">
    <b-input-group>
      <b-form-input
        v-model="text"
        placeholder="Введите сообщение"
        outline
        class="custom-input"
        required
      ></b-form-input>
      <b-input-group-append>
        <b-button type="submit" class="svg-button">
          <img src="/send-svgrepo-com.svg" alt="Отправить" class="svg-icon" />
        </b-button>
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
      // остановился на предотвращении ошибки отправки пустого сообщений
    },
  },
}
</script>

<style scoped>
/* .custom-input::placeholder {
  color: #898989;
} */
.custom-input {
  color: white;
}
/* .form-control {
  background-color: #292929;
  border-radius: 5px !important;
  border: 1px solid #898989;
} */
.btn {
  padding: 0.175rem 0.75rem;
}
.btn-secondary,
.btn-secondary:hover,
.btn-secondary:focus,
.btn-secondary:active {
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
}
</style>
