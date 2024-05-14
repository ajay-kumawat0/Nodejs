const express = require('express');
const port = 8001;
const app = express();

const db = require('./config/mongoose');

app.use('/', require('./routes/user'));

app.listen(port, (err)=> err ? console.log(err):console.log(`Server is connected on port ${port}`))