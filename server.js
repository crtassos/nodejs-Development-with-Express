const path = require('path')
const express = require('express')
const dotenv  = require('dotenv')
//Route files
const bootcamp = require('./routes/bootcamps')
const course = require('./routes/courses')
const morgan = require('morgan')
const colors = require('colors')
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error')
const fileUpload = require('express-fileupload')

//Load env vars
dotenv.config({path: './config/config.env'})

//Connect to Database
connectDB()

const app = express()

//Body parser
app.use(express.json())

// dev logging middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// File uploading
app.use(fileUpload())

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

//Mount the routers
app.use('/api/v1/bootcamps', bootcamp)
app.use('/api/v1/courses', course)

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