const { mqttClient, deviceData } = require('../../mqttClient');

const temp = (io) => {
  io.on('connection', (socket) => {
    console.log(`connect socket-id MQTT: ${socket.id}`)

    //Update WebSocket clients when new data is received
    mqttClient.on('message', (topic, message) => {
      const match = topic.match(/^esp32\/([^/]+)\/sensor$/);
      
      if (match) {
        const deviceId = match[1];
        const newData = JSON.parse(message.toString())
        socket.emit('deviceData', { deviceId, data: newData });
      }
    });

    socket.on('disconnect', () => {
      console.log('WebSocket client disconnected');
    });
  })
}

module.exports = temp