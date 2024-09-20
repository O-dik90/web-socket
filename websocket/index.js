const distance = require('./module/distance');
const randomData = require('./module/randomTemp')

module.exports = function(io) {
  // Initialize WebSocket namespaces or routes
  randomData(io.of('/random-data-temp'))
  distance(io.of('/distance'))
};
