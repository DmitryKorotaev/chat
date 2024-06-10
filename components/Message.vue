<template>
  <div>
    <div v-if="name === 'admin'" class="system">
      <p class="text-center">{{ text }}</p>
      <hr />
    </div>
    <div v-else class="wrap">
      <div class="mes" :class="{ owner }">
        <small>
          <strong>{{ name }}</strong>
        </small>
        <p>{{ text }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: String,
    text: String,
    owner: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
<style scoped>
.system {
  margin-bottom: 1rem;
}
.text {
  margin-bottom: 1rem;
}
.wrap {
  display: flex;
  flex-direction: column;
}
.mes {
  padding: 1rem;
  width: 60%;
  margin: 0 1rem;
  box-shadow: 0 1px 0 0 rgba(50, 50, 50, 0.3);
  border-radius: 4px;
  background-color: #1976d2;
  position: relative;
  margin-bottom: 1rem;
}
.owner {
  background-color: #ffffff;
  color: #000000;
  align-self: flex-end;
}
</style>
