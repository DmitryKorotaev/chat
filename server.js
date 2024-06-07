const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const { loadNuxt, build } = require('nuxt')

const app = express()
const server = http.createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {
  console.log('IO connected')

  socket.on('message', (message) => {
    console.log('Received message from client:', message)
    io.emit('newMessage', { message: message + 'server' })
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})

async function start() {
  const isDev = process.env.NODE_ENV !== 'production'
  const nuxt = await loadNuxt(isDev ? 'dev' : 'start')

  if (isDev) {
    await build(nuxt)
  }

  // Middleware для обработки Nuxt.js маршрутов
  app.use(nuxt.render)

  // Middleware для статических файлов
  app.use(express.static('public'))

  const port = process.env.PORT || 3000
  server.listen(port, () => {
    consola.ready(`Server is listening on http://localhost:${port}`)
  })
}

start()
