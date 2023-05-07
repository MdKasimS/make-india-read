const express= require('express');
const path = require('path');
// const getData = require('./db/read');
const cors = require('cors');

// const connect = mongoose.connect(//)

const publicPath = path.join(__dirname,'public');
const app = express();

app.use((req, res, next) => {
    res.header({"Access-Control-Allow-Origin": "*"});
    next();
  }) 
// console.log(publicPath);

app.use(express.static(publicPath));
// app.use(express.static());

app.get('/', (_, res)=>{
    res.sendFile(`${publicPath}/index.html`);
    console.log('Page requested');
});

app.get('/contact', (_, res)=>{
    res.send('Error Page Not Found');
});

app.get('/featured', (_,res)=>{
    res.sendFile(`${publicPath}/featuredBooks.html`);
});

app.get('/books', (_, res)=>{
    res.sendFile(`${publicPath}/prodPract.html`)
});

app.get('/arrivals', (_, res)=>{
    res.sendFile(`${publicPath}/new_arrivals.html`);
});


app.get('/national', (_, res)=>{
    res.sendFile(`${publicPath}/trending_national.html`);
});

console.log("Listening port 5000");
app.listen(5000);