import express from 'express';
const app = express();

app.get("/heavy",(req,res)=>{
    let total = 0;
    for(let i = 0;i<50_000_000_000;i++){
        total++;
    }
    res.send(`total ${total}`);
})

app.listen(3001,()=>{
    console.log("listerning on 3001")
    console.log(process.pid);
})