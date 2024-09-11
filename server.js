const { createServer } = require("http")
const { Server } = require('socket.io')
const websocketRoutes = require('./websocket');

const httpServer = createServer()
const socket = new Server(httpServer, {
  cors: {
    origin: "http://127.0.0.1:5500"
  }
})

websocketRoutes(socket);

socket.on("connection", (socket) => {
  console.log('Welcome ', socket.id)
})

httpServer.listen(3009, () => {
  console.log("server running at port: 3009")
})