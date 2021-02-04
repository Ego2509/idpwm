#!/usr/bin/env node
/*
Web Manager of the Group of Primary Immunodeficiencies.
Developed by the bioinformatics area.
*/
const path=require('path');
const express=require('express');
const http=require('http');
const db=require('./db.js')

// const httplog=require('http-debug').http;

const app=express();
const server=http.createServer(app);

app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'public/html')));

// from the request documentation
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// http.debug = 2;

const PORT=process.env.PORT||80;//3000;//80;
server.listen(PORT,()=>console.log(`Server running on port ${PORT}`));

//Login System
//more at: https://developer.mozilla.org/en-US/docs/Web/API/Request
app.post('/',(req,res/*,next*/)=>{
    console.log('POST /')
    console.log(req)
    res.json(req.body)// is th same as res.json(req.body)
    let [u,p]=[req.body.u,req.body.p]
    //working
    //login:
    //req(json) ->mysql(db col)
    //u         ->USER
    //p         ->PASW
    q=`SELECT USER=${u} FROM USERS`
    db.query(q,(err,ans,fields)=>{
        if(err) throw(err);
        console.log(`ans: ${ans}`);
        console.log(`fields: ${fields}`);
        console.log(`password match: ${p}`);
    })

})

//this is a backup file