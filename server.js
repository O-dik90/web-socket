const { createServer } = require("http")
const { Server } = require('socket.io')
const websocketRoutes = require('./websocket');
const express = require("express");
const cors = require("cors")

const app = express()
app.use(cors())
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
})

app.get('/', (req, res) => {
  res.send('Hello from Express with Socket.IO!');
  debugger
});

websocketRoutes(io);

io.on("connection", (socket) => {
  console.log('Welcome ', socket.id)
  
  io.on('message', (message) => {
    console.log(`get new data ${message}`)
    
    io.send('Message received:'+ message)
  })
  ws.on('close', () => {
    console.log('Client disconnected')
  })
})

httpServer.listen(3009, () => {
  console.log("server running at port: 3009")
})