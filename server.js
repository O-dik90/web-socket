const { createServer } = require("http")
const { Server } = require('socket.io')
const websocketRoutes = require('./websocket');
const express = require("express");
const cors = require("cors")

const app = express()
app.use(cors())
const httpServer = createServer(app)
const socket = new Server(httpServer, {
  cors: {
    origin: "*"
  }
})

app.get('/', (req, res) => {
  res.send('Hello from Express with Socket.IO!');
});

websocketRoutes(socket);

socket.on("connection", (socket) => {
  console.log('Welcome ', socket.id)
})

httpServer.listen(3009, () => {
  console.log("server running at port: 3009")
})