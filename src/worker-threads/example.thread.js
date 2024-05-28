import { Worker } from 'worker_threads'
import *as response from '../utils/response.util'

export const withoutTread=async(req,res)=>{
    try{
        return response.sendSuccess(res,200,'without worker-thread route',[{"thread":"node:worker thread"}])
    }
    catch(error){
        return response.sendError(res,500,error.message)
    }
}


export const withThread=(req,res)=>{
    try{
        const worker=new Worker('./src/worker-threads/intensive.thread.js')
        worker.postMessage(req.query.operation)
    
        worker.on('message',(count)=>{
            return response.sendSuccess(res,200,'worker-thread api called',{"operation-runned":count})
        })
    }   
    catch(error){
        return response.sendError(res,500,error.message)
    }
}