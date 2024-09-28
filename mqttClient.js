// mqttClient.js
const mqtt = require('mqtt');
const dotenv = require('dotenv');

dotenv.config();

const mqttClient = mqtt.connect({
  host: process.env.MQTT_BROKER_URL,
  port: process.env.MQTT_PORT || 1883,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
  protocol: 'mqtts',
});

let deviceData = {};

mqttClient.on('connect', () => {
  console.log('Connected to HiveMQ Broker');

  // Subscribe to all device topics (e.g., esp32/device1/sensor)
  mqttClient.subscribe('esp32/+/sensor', (err) => {
    if (err) {
      console.error('Subscription error:', err);
    } else {
      console.log('Subscribed to all device topics');
    }
  });
});

mqttClient.on('message', (topic, message) => {
  const match = topic.match(/^esp32\/([^/]+)\/sensor$/);
  if (match) {
    const deviceId = match[1];
    deviceData[deviceId] = message.toString();
    console.log(`Device ${deviceId} sent data: ${message.toString()}`);
  }
});

module.exports = { mqttClient, deviceData };
