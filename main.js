#!/usr/bin/env node
/*
Web Manager of the Group of Primary Immunodeficiencies.
Developed by the bioinformatics area.
*/
const path=require('path');
const express=require('express');
const http=require('http');
const httplog=require('http-debug').http;

const app=express();
const server=http.createServer(app);

app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'public/html')));

http.debug = 2;

const PORT=process.env.PORT||80;//3000;//80;
server.listen(PORT,()=>console.log(`Server running on port ${PORT}`));


//Login System
//more at: https://developer.mozilla.org/en-US/docs/Web/API/Request
app.post('/',(req,res)=>{
    console.log('POST /')
    console.log(req)
    res.json(req.body)//same as res.send(JSON.stringify(req.body))
    res.end()
})

//this is a backup file