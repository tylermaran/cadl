const express = require('express');
const app = express();
// require package logging - morgan - used for image uploads
// const morgan = require('morgan');
// require bodyparser - allows us to use req.body.whatever
const bodyParser = require('body-parser');
// setup mongoose - will run the MongoDB client as well as schemas and validation
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

require('dotenv').config();


// Requiring CORS package and allowing localhost:4000 to access - will update to www.clubfinder.com
const cors = require('cors');

// Possible origins
// const origin = [
//     'http://localhost:5000',
//     'http://clubfinder.us-east-2.elasticbeanstalk.com',
//     'https://www.clubfinder.us/'
// ]

var corsOptions = {
    origin: 'http://localhost:3000',
    origin: true,
    credentials: true,
    allowedHeaders: ['Content-Type']
}

app.use(cors(corsOptions));


// importing routes
const designRoutes = require('./api/routes/designs');
const projectRoutes = require('./api/routes/projects');
// const clubRoutes = require('./api/routes/clubs');
// const userRoutes = require('./api/routes/users');
// const surveyRoutes = require('./api/routes/survey');


mongoose.connect('mongodb+srv://cadltesting:'+ process.env.MONGO_PW + '@cluster0-5puio.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

mongoose.set('useFindAndModify', false)

// running morgan in dev mode
// app.use(morgan('dev'));

// making a folder publically available
// app.use('/uploads', express.static('uploads'));

// running bodyparser - apparently no longer necessary in newer version of Express
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// use, as a method, sets up a middleware
// an incoming request has to go through app.use and to whatever we pass to it
app.use('/designs', designRoutes);
app.use('/projects', projectRoutes)
// app.use('/users', userRoutes);
// app.use('/survey', surveyRoutes);

app.use('/', (req, res, next) => {
    res.status(200).json({
        message: 'Welcome to the CADL API!',
        about: "I'll write docs later - for now check out https://github.com/tylermaran/cadl",
        ps: 'If your name is Jay - stop messing with my api'
    })
})

// Error handling: if you reach this line, it is because the request did not meet any of the 
// previous routes (/products, /orders, etc.)
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    // using the next message to forward the error
    next(error);
});

// This will be our error handing middleware. This allows us to throw errors from anywhere in the app
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;