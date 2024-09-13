import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

// Custom error handling
import { notFound, errorHandler } from './middlerware/errorMiddleware.js'

// ROUTING
import userRoutes from './routes/userRoutes.js'
import testimonialRoutes from './routes/testimonialRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import emailRoutes from './routes/emailRoutes.js'

dotenv.config()

connectDB() // db connection function call

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running.....')
})

app.use('/api/route', userRoutes)

// make sure that the error handler middleware after this
// because the error handler middleware will be called if no routes are matched

// for handling all 404 ERRORS
app.use(notFound)

// Custom middleware with ERROR handler
app.use(errorHandler)

const PORT = process.env.PORT

app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
