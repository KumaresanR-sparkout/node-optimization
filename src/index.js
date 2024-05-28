import express from 'express'
import env from 'dotenv'
import cluster from 'cluster'
import os from 'os'
import mainRouter from './routes/main.route'
import * as redis from './caches/redis.cache'

env.config()

const app = express()
app.use(express.json())
redis.connection()
app.use('/api/optimize', mainRouter)

const CPUS = os.cpus().length

if (cluster.isPrimary) {
    console.log(`Master cpu-core of ${process.pid} is running`)
    for (let i = 0; i < CPUS; i++) {
        cluster.fork()
        cluster.on('exit', (worker, code, signal) => {
            console.log(`process killed at ${worker.process.pid}`)
            cluster.fork()
        });
    }
}
else {
    app.listen(process.env.PORT, () => {
        console.log(`server started at port:${process.env.PORT}`)
    })
}
