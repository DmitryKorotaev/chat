const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const { loadNuxt, build } = require('nuxt')

const Users = require('./Users')
const users = new Users()

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

  //валидация
  socket.on('userJoined', (data, cd) => {
    if (!data.name || !data.room) {
      return cb('data incorrect')
    }
    socket.join(data.room)

    users.remove(socket.id)
    //Добавляем пользователя в комнату
    users.add({
      id: socket.id,
      name: data.name,
      room: data.room,
    })
    cb({ userId: socket.id })

    socket.emit('newMessage', m('admin', `Добро пожаловать ${data.name}`))

    socket.broadcast
      .to(data.room)
      .emit('newMessage', m('admin', `Пользователь ${data.name} зашел`))
  })

  socket.on('createMessage', (data, cb) => {
    if (!data.text) {
      return cd('the text cannot be empty')
    }
    // если пользователь найден, код отправляет новое сообщение в комнату пользователя
    const user = users.get(data.id)
    if (user) {
      io.to(user.room).emit('newMessage', m(user.name, data.text, data.id))
    }
    cb({ status: 'OK', message: 'Message received and processed' })
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
