const socket = io();
socket.on('countUpdated', (count)=>{
    console.log('Count Updated....', count);

    socket.emit('increment');
})