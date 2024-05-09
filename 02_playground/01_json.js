const fs = require('fs');

const user= {
    name : "Ram",
    age : 20,
    email : 'ram@gmail.com'
}

// console.log(user);

// const jsonData = JSON.stringify(user)
// // console.log(jsonData);
// fs.writeFileSync('01_jsonData.json', jsonData)

// // read data from json 
// const bufferData = fs.readFileSync('01_jsonData.json'); // read data from a json file
// console.log(bufferData.toString()); // buffer data convert into string
// const stringData = JSON.parse(bufferData); // it convert data into object format
// console.log(stringData.age); 


// challenge 

const bufferData = fs.readFileSync('01_jsonData.json');
const stringData = bufferData.toString();
let objData = JSON.parse(stringData)
// console.log(objData);

objData.name = 'ram';
objData.age = 22;

const reWrite = JSON.stringify(objData);
// console.log(reWrite);
fs.writeFileSync('01_jsonData.json', reWrite)