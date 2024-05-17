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

// server-side
io.on('connection', (socket) => {
    console.log('Web socket is call from server');

    // server to client 
    socket.emit('countUpdated', count);

    // client-side  // client to server 
    socket.on('increment', () => {
        count++;
        // socket.emit('countUpdated', count); // it is used to check separate - separate
        io.emit('countUpdated', count); // this one is used to everyone single connection
    })
})

server.listen(port, (err)=>{
    err ? console.log(err) : console.log('Server is connected on port :', port);
})