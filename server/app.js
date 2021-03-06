const express = require('express')
const app = express()
// const morgan = require('morgan');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

// Require .env for secrets
require('dotenv').config()

// Requiring CORS package and allowing all access
const cors = require('cors')
var corsOptions = {
    origin: true,
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}
app.use(cors(corsOptions))

// Connect to Mongodb
mongoose.connect(
    'mongodb+srv://cadltesting:' +
        process.env.MONGO_PW +
        '@cluster0-5puio.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        // useUnifiedTopology: true
    }
)
mongoose.set('useFindAndModify', false)

// importing routes
const designRoutes = require('./api/routes/designs')
const projectRoutes = require('./api/routes/projects')
const fileRoutes = require('./api/routes/fileUpload')
const categoryRoutes = require('./api/routes/categories')

// running bodyparser - apparently no longer necessary in newer version of Express
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
)
app.use(bodyParser.json())

// Direct towards route handler
app.use('/designs', designRoutes)
app.use('/projects', projectRoutes)
app.use('/files', fileRoutes)
app.use('/categories', categoryRoutes)

app.use('/', (req, res, next) => {
    res.status(200).json({
        message: 'Welcome to the CADL API!',
        about:
            "I'll write docs later - for now check out https://github.com/tylermaran/cadl",
        ps: 'If your name is Jay - stop messing with my api',
    })
})

// Error handling: if you reach this line, it is because the request did not meet any of the prior routes
app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    // forward the error
    next(error)
})

// This allows us to throw errors from anywhere in the app
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message,
        },
    })
})

module.exports = app
