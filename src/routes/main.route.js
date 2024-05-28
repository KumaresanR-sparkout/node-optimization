import express from 'express'
import * as worker from '../worker-threads/example.thread'
import { CPUIntensive } from '../clusters/intensive.cluster'
import {getCache} from '../caches/redis.cache'
const router = express.Router()

//@POST
router.post('/', worker.withThread)
//@GET
router.get('/', worker.withoutTread)
router.get('/cluster', CPUIntensive)
router.get('/cache',getCache)

export default router