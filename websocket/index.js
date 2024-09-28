const distance = require('./module/distance');
const randomData = require('./module/randomTemp');
const temp = require('./module/temp');

module.exports = function(io) {
  // Initialize WebSocket namespaces or routes
  randomData(io.of('/random-data-temp'))
  distance(io.of('/distance'))
  
  //create route for web-socket mqtt
  temp(io.of('/temp'))
};
