<template>
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
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      users: [
        { id: 1, name: 'Alice', avatar: 'path/to/alice.jpg', online: true },
        { id: 2, name: 'Bob', avatar: 'path/to/bob.jpg', online: false },
        { id: 3, name: 'Charlie', avatar: 'path/to/charlie.jpg', online: true },
      ],
    }
  },
  computed: mapState(['user']),
  methods: {},
}
</script>

<style scoped>
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
</style>
