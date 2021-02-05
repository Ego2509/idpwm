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

function standartQuery(q){
    if(!(/\s|\=|\;/g.test(q))) return 0;//sus injection query
    else return db.query(q,(err,ans/*,fields*/)=>{
        try {
            if(err) throw(err)
        } catch (e) {
            console.log(`[${String(Date.now())}] query error: ${err.message}`)
        }
        console.log(`ans: ${ans.toString()}`)
        console.log(`ID-USER-PASW: ${ans[ID]}-${ans[USER]}-${ans[PASW]}`)
        // console.log(`fields: ${JSON.stringify(fields)}`) // more than needed 
        return ans
    })
}


//Login System
//more at: https://developer.mozilla.org/en-US/docs/Web/API/Request
app.post('/',(req,res/*,next*/)=>{
    console.log('POST /')
    console.log(req)
    res.json(req.body)// is th same as res.json(req.body)
    let [u,p]=[req.body.u,req.body.p] //working
    
    //login:
    //req(json) ->mysql(db col)
    //u         ->USER
    //p         ->PASW
    q=`SELECT * FROM USERS WHERE USER=${db.escape(u)}`//escape prevents sql attacks
    
    ans=standartQuery(q)
    ans=(ans)?ans:()=>{
        res.send("sus query")
    }
    console.log(`password match: ${()=>{
        let a=(p===ans[PASW])
        if(a) res.send("password match")
        else res.send("wrong user or password")
        return a
    }}`)

})

//this is a backup file