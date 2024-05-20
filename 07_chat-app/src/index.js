const http = require('http');
const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const Filter = require('bad-words');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const {addUser, removeUser, getUser, getUserInRoom} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 8001;
app.use(express.static(path.join(__dirname, '../public')));

// let count = 0;

// server-side
io.on('connection', (socket) => {  // io.on => it is used to only when an cliet is connected not used for when client is disconnected
    // console.log('Web socket is call from server');

    
    socket.on('join', ( options, callback) => {
        const {error , user } = addUser({id : socket.id, ...options})

        if(error){
            return callback(error);
        }
        socket.join(user.room)
        socket.emit('message', generateMessage('Welcome'));  // 'Hello' => name of the event  //  'Welcome to chat app' => callback msg provide to client 
        socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has joined..!`))

        callback(error);
        // socket.emit, io.emit, socket.broadcast.emit
        // io.to.emit, socket.broadcast.to.emit
    })

    socket.on('sendMessage', (message, callback) => { 
        const filter = new Filter();

        if (filter.isProfane(message)) {
            return callback('Profane wrod are not allowed..!');
        }

        io.to('class').emit('message', generateMessage(message)); // send msg to every client who is connected to server
        callback();
    })

    // *******Send Loaction start******
    socket.on('sendLoaction', (loc, callback) => {
        io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${loc.latitude},${loc.longitude}`))
        callback();
    })
    // *****Send Loaction end******


    // it is run when user is left or diconnected
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        io.to(user.room).emit('message', generateMessage(`${user.username} has left..!`));
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

server.listen(port, (err) => {
    err ? console.log(err) : console.log('Server is connected on port :', port);
})