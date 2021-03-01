const path = require('path')
const express = require('express')
const dotenv  = require('dotenv')
//Route files
const bootcamp = require('./routes/bootcamps')
const course = require('./routes/courses')
const auth = require('./routes/auth')
const users = require('./routes/users')
const reviews = require('./routes/reviews')
const morgan = require('morgan')
const colors = require('colors')
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet')
const xssClean = require('xss-clean')
const rateLimit = require("express-rate-limit")
const hpp = require('hpp')
const cors = require('cors')

//Load env vars
dotenv.config({path: './config/config.env'})

//Connect to Database
connectDB()

const app = express()

//Body parser
app.use(express.json())

// Cookie parser
app.use(cookieParser())

// dev logging middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// File uploading
app.use(fileUpload())

// Sanitize data
app.use(mongoSanitize())

// Set security headers 
app.use(helmet())

// Prevent XSS attacks
app.use(xssClean())

// Enable Cross-origin resource sharing (CORS)
app.use(cors())

// limit repeated requests
const rateLimiter = rateLimit({
    windowMs: 10 * 60 *1000, //10mins
    max:10
})
app.use(rateLimiter)

// http parameter pollution
app.use(hpp())

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

//Mount the routers
app.use('/api/v1/bootcamps', bootcamp)
app.use('/api/v1/courses', course)
app.use('/api/v1/auth', auth)
app.use('/api/v1/users', users)
app.use('/api/v1/reviews', reviews)

//Register the custom error handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(
    PORT,
    console.log(`Server running in 
        ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))

// Handle unhandled promise rejections
process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`.red)
    //Close server and exit process
    server.close(()=>process.exit(1))
})