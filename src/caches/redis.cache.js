import * as redis from 'redis'
import * as response from '../utils/response.util'
const client = redis.createClient()
export const connection=async()=>{
    try{
        await client.connect()
        console.log('redis server connected')
    }
    catch(error){
        console.log('error connection')
    }
}

export const getCache=async(req,res)=>{

    try{
        const isExist=await client.exists(req.query.key)
        if(!isExist){
           const setCache=await client.set('cache',JSON.stringify(req.body)) 
           console.log(setCache)
           response.sendSuccess(res,200,'request-response value',[req.body])
        }
        const cachedResponse=await client.get('cache')
        const _response=await JSON.parse(cachedResponse)
        return response.sendSuccess(res,200,'redis-server cached value',[_response])
    }
    catch(error){
        return response.sendError(res,500,error.message)
    }
}