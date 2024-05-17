const socket = io();
socket.on('countUpdated', (count)=>{
    console.log('Count Updated....', count);
})

socket.on('countUpdated', (count)=>{
    console.log('Updated Count');
})