const { parentPort } = require('node:worker_threads');

const CPUIntensive=(length)=>{
    let count=0
    for(i=0;i<length;i++){
        count++
    }
    return count
}

parentPort.on('message',(length)=>{
    const count=CPUIntensive(length)
    parentPort.postMessage(count)
})