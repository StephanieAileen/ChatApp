const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('templates')); 

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('Un usuario se conectó');

  socket.on('Mensaje de chat', (msg) => {
    io.emit('Mensaje de chat', msg);
  })
  socket.on('disconnect', () => {
    console.log('Un usuario de desconectó');
  });
});

server.listen(3200, () => {
  console.log('listening on *:3200');
});


