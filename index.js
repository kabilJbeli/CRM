//Load HTTP module
const http = require("http");
const hostname = '127.0.0.1';
const port = 3000;


const express = require('express');
const app =  express();

app.get('/t',(req,res)=>{
    res.send('Hello World bjkk');
});

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`);
});