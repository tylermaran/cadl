// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');
// const fetch = require('node-fetch');
// const app = require('./app');
// // const app = express();
// const port = process.env.PORT || 5000;

// // Initialize Body parser to use JSON and URL Encoded
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


// app.get('/api/', (req, res) => {
//     console.log('posting data');
//     res.status(200).json({
// 		status: 'All good'
//     });
// });


// if (process.env.NODE_ENV === 'production') {
//   // Serve any static files
//   app.use(express.static(path.join(__dirname, 'client/build')));
//   // Handle React routing, return all requests to React app
//   app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//   });
// }

// app.listen(port, () => console.log(`Listening on port ${port}`));



const http = require('http');
const app = require('./app');

const port = process.env.PORT || '5000';

const server = http.createServer(app)

server.listen(port, () => {
    // console.log(process.env.MONGO);

    console.log("App is running on port " + port);
});