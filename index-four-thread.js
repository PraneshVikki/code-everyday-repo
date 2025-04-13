const { error } = require('console');
const express = require('express');
const { resolve } = require('path');
const { Worker } = require('worker_threads')
const app = express();

app.get("/nonblocking",(req,res)=>{
    
    res.send("the page is non blocking");
})

app.get("/",(req,res)=>{
    
    res.send("hi")
})

function createCounter(){
    return new Promise((resolve,reject)=>{
        const worker = new Worker("./four-worker",{
            workerData:{thread_count:10}
        });
        worker.on("message",(data)=>{
            resolve(data);
        })
        worker.on("error",(error)=>{
            reject(error)
        })
    })
    
}

app.get("/blocking",async(req,res)=>{
    const workerResult = [];
    for(let i = 0;i<10;i++){
        workerResult.push(createCounter())
    }
    const totalResult = await Promise.all(workerResult);

    res.send(totalResult[0] + totalResult[1] + totalResult[2] + totalResult[3] + totalResult[4] + totalResult[5] + totalResult[6] + totalResult[7] + totalResult[8] + totalResult[9]);

    
})

app.listen(3001,(req,res)=>{
    console.log("server is running..")
})