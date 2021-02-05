#!/usr/bin/env node
/*
Web Manager of the Group of Primary Immunodeficiencies.
Developed by the bioinformatics area.
*/
const path=require('path')
const express=require('express')
const http=require('http')
const {db}=require('./db')

// const httplog=require('http-debug').http;

const app=express();
const server=http.createServer(app);

app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'public/html')))

// from the request documentation
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.text())
// http.debug = 2;

const PORT=process.env.PORT||80;//3000;//80;
server.listen(PORT,()=>console.log(`Server running on port ${PORT}`))

function susQuery(){
    console.log("sus query");
    res.send("sus query")
}

//Login System
//more at: https://developer.mozilla.org/en-US/docs/Web/API/Request
app.post('/',(req,res/*,next*/)=>{
    console.log('POST /')
    console.log(req)
    // res.json(req.body)// is th same as res.json(req.body)
    let [u,p]=[req.body.u,req.body.p] //working
    
    //login:
    //req(json) ->mysql(db col)
    //u         ->USER
    //p         ->PASW
    q=`SELECT * FROM USERS WHERE USER=${db.escape(u)}`//escape prevents sql attacks
    
    if(!(/\s|\=|\;/g.test(q))) susQuery();//sus injection query
    else db.query(q,(err,ans/*,fields*/)=>{
        try {
            if(err) throw(err)
        } catch (e) {
            console.log(`[${String(Date.now())}] query error: ${err.message}`)
        }
        // console.log(`ans: ${JSON.stringify(ans)}`)
        // console.log(`ID-USER-PASW: ${ans[0].ID}-${ans[0].USER}-${ans[0].PASW}`)
        // console.log(`fields: ${JSON.stringify(fields)}`) // more than needed 
        ans=ans[0]
        console.log("ans... "+ans)
        console.dir(ans)
        ans=(ans!=0)?ans:()=>{
            susQuery()
        }
        //check
        let a=(p===ans.PASW)
        console.log(`PASW: '${ans.PASW}' - p: '${p}' - match: ${a}`)
        if(a) res.send("password match")
        else res.send("password mismatch")
        
    })


})

//this is a backup file