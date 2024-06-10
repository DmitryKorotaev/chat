<template>
  <b-row>
    <b-col>
      <b-card>
        <b-card-title class="title-card"> Nuxt чат </b-card-title>
        <div>
          <b-form @submit.prevent="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="input-group-2" label="Имя:" label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="user.name"
                placeholder="Введите имя"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-3"
              label="Комната:"
              label-for="input-3"
            >
              <b-form-input
                id="input-3"
                v-model="user.room"
                placeholder="Введите комнату"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">
              <b-form-checkbox-group
                v-model="user.checked"
                id="checkboxes-4"
                :aria-describedby="ariaDescribedby"
              >
                <b-form-checkbox value="me">Check me out</b-form-checkbox>
                <b-form-checkbox value="that">Check that out</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
        </div>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  head: {
    title: 'Добро пожаловать в Nuxt чат',
  },
  data() {
    return {
      user: {
        name: '',
        room: '',
        checked: [],
      },
      show: true,
    }
  },
  // ОСТАНОВИЛСЯ НА ПРОВЕРКЕ ВСТУПИТЕЛЬНОГО СООБЩЕНИЯ
  methods: {
    ...mapMutations(['setUser']),

    onSubmit() {
      console.log('onSubmit')
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
          console.log(data)
        } else {
          this.user.id = data.userId
          this.setUser(this.user)
          this.$router.push('/chat')
        }
      })
    },

    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.user.email = ''
      this.user.name = ''

      this.user.checked = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },
}
</script>

<style scoped>
.title-card {
  font-weight: 700;
  font-size: 2rem;
}
</style>
