const socket = io();

socket.on('message', (message) => {
    console.log(message);
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()

    // const message = document.querySelector('input').value;
    const message = e.target.elements.msg.value;
    socket.emit("sendMessage", message);
})







// ****************************************************************************************
// server to client
// socket.on('countUpdated', (count)=>{
//     console.log('Count Updated....', count);
// })

// // client-side  // client to server
// document.querySelector('#increase').addEventListener('click', ()=>{
//     console.log("Button is clicked");
//     socket.emit('increment');
// })
