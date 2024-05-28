import cluster from 'cluster'
import * as response from '../utils/response.util'

export const CPUIntensive=(req,res)=>{
    try{
        for(let i=0;i<100000000;i++){
            const power=Math.pow(Math.random(),Math.random())
        }
        cluster.worker.kill()
        return response.sendSuccess(res,200,'the request loop will completed at operation of 1000000',[])
    }
    catch(error){
        return response.sendError(res,500,error.message)
    }
}