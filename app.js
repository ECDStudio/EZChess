const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3001;

server.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

const socketIo = require('socket.io');
const io = socketIo(server);
let gameState;

io.on('connection', socket => {
  if (gameState !== undefined) {
    socket.emit('FromAPI', gameState);
  }

  socket.on('ToAPI', data => {
    gameState = data;
    io.emit('FromAPI', gameState);
  });

  socket.on('disconnect', () => console.log('Client disconnected'));
});
