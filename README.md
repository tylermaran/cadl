## CADL - An open source CAD Library with 3D rendering

Designed and built to host a variety of CAD files at NoiseBridge Hackerspace, CADL is an open source tool for anyone who wants to visualize and share a variety of CAD projects.

## Installing and running
This is a monorepo structure using the 'concurrently' package to manage a Node API and React front end. 

Downloading and running:

`Clone the Repo`

Run `npm i` from parent level to install dependencies

Run `npm run client` to start the react front-end in dev mode (react dev server)

Run `npm run server` to start the server in dev mode (nodemon)

Run `npm run dev` to concurrently run the server and client

***

# Server
This is a node/express API connected to a MongoDB Database. 
This API relies on the AWS SDK to connect to an S3 Bucket for file storage

Running from top level:

`npm run server`

Dependencies

* `"aws-sdk": "^2.520.0"`
* `"body-parser": "^1.19.0"`
* `"cors": "^2.8.5"`
* `"dotenv": "^8.1.0"`
* `"express": "^4.17.1"`
* `"mongoose": "^5.6.13"`
* `"multer": "^1.4.2"`
* `"multer-s3": "^2.9.0"`
* `"node-fetch": "^2.6.0"`
* `"nodemon": "^1.19.1"`

***

# React UI
React front end with extensive THREE.JS implementation for rendering and editing CAD files.

Running from top level:

`npm run client`

Dependencies

* `"bootstrap": "^4.3.1"`
* `"react": "^16.9.0"`
* `"react-bootstrap": "^1.0.0-beta.12"`
* `"react-dom": "^16.9.0"`
* `"react-router-dom": "^5.0.1"`
* `"react-scripts": "3.1.1"`
* `"three": "^0.107.0"`

# API Documentation

Routes: 
GET all Projects: `api/projects`

GET all Designs: `api/designs`

GET Specific Project: `api/project/project_name`

GET Specific Design: `api/designs/design_name`