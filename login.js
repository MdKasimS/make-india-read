const express = require('express');
const path = require('path');

const publicPath = path.join(__dirname,'public');
const app = express();

// console.log(publicPath);
app.use(express.static(publicPath));

app.get('/', (req, res)=>{
    console.log("I am in login", req.query);
    res.sendFile(`${publicPath}/index.html`);
})

app.get('/data', (req, res)=>{

    console.log("I recieved data", req.query);
    // res.sendFile(`${publicPath}/index.html`);
    // res.redirect('/');
    res.redirect('http://localhost:5000/');
});

app.listen(5002);
console.log("Server started at 5002....");