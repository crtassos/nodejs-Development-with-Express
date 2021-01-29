const express = require('express')
const dotenv  = require('dotenv')
//Route files
const bootcamp = require('./routes/bootcamps')
const morgan = require('morgan')
const connectDB = require('./config/db')

//Load env vars
dotenv.config({path: './config/config.env'})

//Connect to Database
connectDB()

const app = express()

// dev logging middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//Mount the routers
app.use('/api/v1/bootcamps', bootcamp)

const PORT = process.env.PORT || 5000

const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))

// Handle unhandled promise rejections
process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`)
    //Close server and exit process
    server.close(()=>process.exit(1))
})