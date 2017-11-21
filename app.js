const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const port = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

const server = http.createServer(app);
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

server.listen(port, () => console.log(`Listening on port ${port}`));