const express = require('express');
const { Worker } = require('worker_threads')
const app = express();

app.get("/nonblocking",(req,res)=>{
    
    res.send("the page is non blocking");
})

app.get("/",(req,res)=>{
    
    res.send("hi")
})

app.get("/blocking",(req,res)=>{
    console.log("hi")
    const worker = new Worker("./worker.js");
    worker.on("message",(data)=>{
        res.send(`the page is blocking ${data}`);
    })
    worker.on("error",(error)=>{
        res.send(`${error}`);
    })
    
})

app.listen(3001,(req,res)=>{
    console.log("server is running..")
})