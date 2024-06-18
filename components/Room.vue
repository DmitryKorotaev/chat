<template>
  <b-col class="room" sm="12" md="3" lg="3">
    <b-card class="room-card" ref="chatRoom">
      <b-card-title class="room-card-title"
        >Список людей в комнате</b-card-title
      >

      <b-list-group>
        <b-list-group-item
          v-for="u in users"
          :key="u.id"
          class="d-flex align-items-center"
        >
          <div class="user-name">
            {{ u.name }}
          </div>
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </b-col>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {}
  },

  computed: mapState(['user', 'users']),

  mounted() {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      this.setUser(JSON.parse(savedUser))
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    scrollToPosition(scrollTop) {
      this.$refs.chatRoom.scrollTop = scrollTop
    },
  },
}
</script>

<style scoped>
.room {
  background-color: rgb(33, 33, 33);
}
.card {
  border: none !important;
}
.room-card {
  background-color: transparent;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: rgb(33, 33, 33);
  padding: 1rem;
  transition: padding 0.3s;
}
.room-card-title {
  font-size: 1.3rem;
  color: white;
}
.list-group {
  border-radius: 0;
}

/* .list-group-item:first-child {
  border-top: 1px solid rgb(80, 80, 80);
} */

.list-group-item {
  background-color: transparent;
  border: 0;
  border-bottom: 1px solid rgb(80, 80, 80);
}

.user-name {
  color: white;
  font-size: 1.2rem;
  font-weight: thin;
}
</style>
