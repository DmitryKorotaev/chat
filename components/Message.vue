<template>
  <div>
    <div v-if="name === 'admin'" class="system">
      <p class="text-center">{{ text }}</p>
      <hr />
    </div>
    <div v-else class="wrap">
      <div class="mes" :class="{ owner }">
        <small :class="messageNameClass">
          <strong>{{ name }}</strong>
        </small>
        <p class="message-text">{{ text }}</p>
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
  computed: {
    messageNameClass() {
      return this.owner ? 'message-name-owner' : 'message-name'
    },
  },
}
</script>
<style scoped>
.system {
  color: white;
  margin-bottom: 1rem;
}
hr {
  background-color: white;
}
.text-center {
  margin-bottom: 1rem;
}
.wrap {
  display: flex;
  flex-direction: column;
}
.mes {
  padding: 0.5rem 1.1rem;
  max-width: 60%;
  margin: 0 1rem 1rem 0;
  box-shadow: 0 1px 0 0 rgba(50, 50, 50, 0.3);
  border-radius: 4px;
  background-color: #2b2c2c;
  position: relative;
  margin-bottom: 1rem;
  word-wrap: break-word;
  align-self: flex-start;
}
.owner {
  margin: 0 0rem 1rem 1rem;
  background-color: #454648;
  color: white;
  align-self: flex-end;
  word-wrap: break-word;
}
.message-name-owner,
.message-name {
  color: #72a9eb;
  display: block;
}
.message-name-owner {
  text-align: right;
}

.message-name {
  text-align: left;
}
.message-text {
  color: white;
}
p {
  margin-bottom: 0;
}
</style>
