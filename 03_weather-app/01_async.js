// // console.log("Start")

// setTimeout(()=>{
//     // console.log("Run After 2 second");
// }, 2000)

// // console.log("End");



// const listLocation = (location)=>{
//     location.forEach((location) => {
//         console.log(location);
//     });
// }

// const location = ['Gujarat', 'Rajasthan']

// listLocation(location);


const request = require('request');

const url = 'http://api.weatherstack.com/current?access_key=e84129bc20b99e3b1452c36379b4e3ff&query=42.3605,-71.0596'

request({url}, (err, res)=>{
    const data = JSON.parse(res.body)
    console.log(data.current.temperature);
})