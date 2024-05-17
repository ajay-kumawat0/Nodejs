const express = require('express');
const port = 8001;
const app = express();

app.use('/', require('./app'));

app.listen(port, (err)=>{
    err ? console.log(err) : console.log(`Server is connected on port : ${port}`);
})