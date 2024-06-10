const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const { loadNuxt, build } = require('nuxt')

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const m = (name, text, id) => ({
  name,
  text,
  id,
})

io.on('connection', (socket) => {
  // console.log('IO connected')

  socket.on('userJoined', (data, cd) => {
    if (!data.name || !data.room) {
      return cd('data incorrect')
    }
    socket.join(data.room)
    cd({ userId: socket.id })

    socket.emit('newMessage', m('admin', `Добро пожаловать ${data.name}`))

    socket.broadcast
      .to(data.room)
      .emit('newMessage', m('admin', `Пользователь ${data.name} зашел`))
  })

  socket.on('createMessage', (data, callback) => {
    setTimeout(() => {
      socket.emit('newMessage', {
        text: data.text + 'Server',
      })
      callback({ status: 'OK', message: 'Message received and processed' })
    }, 500)
  })

  socket.on('error', (error) => {
    console.error('Socket error:', error)
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id)
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
