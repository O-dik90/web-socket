const distance = (io) => {
  io.on('connection', (socket) => {
    console.log(`connect to socket: ${socket.id}`)
  })
}

module.exports = distance