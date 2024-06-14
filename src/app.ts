import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import { rateLimit } from 'express-rate-limit'
import router from './routes'

const compress = {
  level: 6,
  threshold: 100 * 1000,
}

const rateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: true,
})

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(rateLimiter)
app.use(compression(compress))
app.use('/v1', router)

export default app
