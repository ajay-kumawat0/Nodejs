const socket = io();

// Elements
const $messageFrom = document.querySelector('#message-form');
const $messageFromInput = $messageFrom.querySelector('input');
const $messageFromButton = $messageFrom.querySelector('button');
const $locationButton = document.querySelector('#location');
const $messages = document.querySelector('#messages');

// Templates
const messageTemplates = document.querySelector('#message-template').innerHTML;
const locationMessageTemplate = document.querySelector('#loaction-message-template').innerHTML;

// Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

socket.on('message', (message) => {
    console.log(message);
    const html = Mustache.render(messageTemplates, {
        message: message.text,
        createdAt: moment(message.createdAt).format('h:m a')
    });
    $messages.insertAdjacentHTML('beforeend', html)
})

socket.on('locationMessage', (message) => {
    console.log(message);
    const html = Mustache.render(locationMessageTemplate, {
        url: message.url,
        createdAt: moment(message.createdAt).format('h:m a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

$messageFrom.addEventListener('submit', (e) => {
    e.preventDefault()

    // disable
    $messageFromButton.setAttribute('disabled', 'disabled');

    const message = e.target.elements.message.value;
    socket.emit("sendMessage", message, (error) => {
        // enable
        $messageFromButton.removeAttribute('disabled');
        $messageFromInput.value = '';
        $messageFromInput.focus();

        if (error) {
            return console.log(error);
        }
        console.log('Message was delivered..!');
    });
})

$locationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Navigator geolocation is not support in your browser')
    }
    // disabled button
    $locationButton.setAttribute('disabled', 'disabled');

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLoaction', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            $locationButton.removeAttribute('disabled');
            console.log('Location shared successfully...!');
        })
    })

})

socket.emit('join', {username, room},(error)=>{
    if(error){
        alert(error);
        location.href = '/'
    }
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
