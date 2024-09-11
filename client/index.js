const socketChat = io('http://localhost:3009/random-data-temp');

socketChat.on('connect', () => {
  console.log('Socket-io Connected!');
});

socketChat.on('update', (msg) => {
  console.log('data:', msg);
});

socketChat.on('disconnect', () => {
  console.log('Disconnect from /random-data');
});
