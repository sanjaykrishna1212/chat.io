const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const IP = require('ip');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const ipAddress = IP.address();
console.log("System ip : ", ipAddress);
const port = Math.floor(Math.random() * (9999 - 3000 + 1)) + 3000;
console.log("Port : ", port);
let username


app.get('/get-ip', (req, res) => {
  res.json({ ipAddress, ip: `${ipAddress}:${port}` });
});

app.use('/', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  console.log(`${username} joined`);
  socket.on('chat message', (message) => {
    console.log(message,'message');
    username = message.name
    io.emit('chat message', message); // Broadcast the message to all connected clients
  });

socket.on('disconnect', () => {
    console.log(`${username} disconnected`);
  });
});

server.listen(port, ipAddress, () => {
  console.log(`Socket server : ${ipAddress}:${port}`);
});


