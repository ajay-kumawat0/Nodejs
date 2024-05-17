const http = require('http');
const express = require('express');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 8001;
app.use(express.static(path.join(__dirname, '../public')));

let count = 0;

io.on('connection', (socket)=>{
    console.log('socketio is connection');

    socket.emit('countUpdated', count);
})

server.listen(port, (err)=>{
    err ? console.log(err) : console.log('Server is connected on port :', port);
})