const http = require('http');
const express = require('express');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 8001;
app.use(express.static(path.join(__dirname, '../public')));

// let count = 0;

// server-side
io.on('connection', (socket) => {  // io.on => it is used to only when an cliet is connected not used for when client is disconnected
    // console.log('Web socket is call from server');

    socket.emit('message', 'Welcome to chat app');  // 'Hello' => name of the event  //  'Welcome to chat app' => callback msg provide to client 
    socket.broadcast.emit('message', 'A new user is connected..!')

    socket.on('sendMessage', (message) => {
        io.emit('message', message); // send msg to every client who is connected to server
    })

    // *******Send Loaction start******
    socket.on('sendLoaction', (loc) => {
        io.emit('message',`https://google.com/maps?q=${loc.latitude},${loc.longitude}`)
    })
    // *****Send Loaction end******

    // it is run when user is left or diconnected
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left');
    }) // 'disconnect' => this is build in functionalty

    /* 

    // server to client 
    socket.emit('countUpdated', count);

    // client-side  // client to server 
    socket.on('increment', () => {
        count++;
        // socket.emit('countUpdated', count); // it is used to check separate - separate
        io.emit('countUpdated', count); // this one is used to everyone single connection  // io.emit => text capture from another client or check how much client added to server
    })

    */
})

server.listen(port, (err)=>{
    err ? console.log(err) : console.log('Server is connected on port :', port);
})