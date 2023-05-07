// const dbConnect = require('./db/mongodb');
const static = require('./db/statData');
const getData = require('./db/read');
const cors = require('cors');

const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.header({"Access-Control-Allow-Origin": "*"});
    next();
  }) 

console.log("Salam Hindutshan !!!");
console.log("Alhamdulillah !!! All set !!!");

app.get('/books/data', async (req, res)=>{
    console.log(req.query['kasim']);
    let data = await getData();
    console.log("Sending data");
    // console.log(typeof(data));
    res.send(data);
    console.log("I am at server 5001.......");
});

app.listen(5001);
// console.log(static);
console.log("Server started at 5001....");



