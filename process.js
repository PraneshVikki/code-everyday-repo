import express from 'express';
import os from 'os';
import cluster from 'cluster';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
cluster.setupPrimary({
  exec: __dirname +"/index-cluster.js",
})

const numCPUs = os.cpus().length;

for(let i = 0;i<numCPUs;i++){
  cluster.fork();
}

cluster.on("exit",(worker)=>{
  console.log(`Worker ${worker.process.pid} died`);
  cluster.fork();
})