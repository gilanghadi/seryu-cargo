import cluster from 'cluster'
import http from 'http'
import app from './app'
import dotenv from 'dotenv'
import os from 'os'
import path from 'path'
dotenv.config({ path: path.join(__dirname, '../.env') })

const numCPUs = os.cpus().length
if (cluster.isPrimary) {
  console.log(`Master process ${process.pid} is running. Number of CPU : ${numCPUs}`)

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker process ${worker.process.pid} died. Restarting...`)
    cluster.fork()
  })
} else {
  const PORT = process.env.APP_PORT || 3000
  const server = http.createServer(app)
  server.listen(PORT, () => {
    console.log(`listening on port ${PORT}. ${process.pid}`)
  })
}
