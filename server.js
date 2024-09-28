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
});

// Serve latest device data via HTTP
app.get('/api/device/:deviceId/data', (req, res) => {
  const { deviceId } = req.params;
  if (deviceData[deviceId]) {
    res.json({ deviceId, data: deviceData[deviceId] });
  } else {
    res.status(404).json({ message: `No data available for device ${deviceId}` });
  }
});

app.get('/api/devices/data', (req, res) => {
  res.json(deviceData);
});

websocketRoutes(io);

io.on("connection", (socket) => {
  console.log('Welcome ', socket.id)

  io.on('message', (message) => {
    console.log(`get new data ${message}`)

    io.send('Message received:' + message)
  })
  
  io.on('close', () => {
    console.log('Client disconnected')
  })
})

httpServer.listen(3009, () => {
  console.log("server running at port: 3009")
})