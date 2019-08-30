## CADL - An open source CAD Library with 3D rendering

Designed and built to host a variety of CAD files at NoiseBridge Hackerspace, CADL is an open source tool for anyone who wants to visualize and share a variety of CAD projects.

## Installing and running
This is a monorepo structure using the 'concurrently' package to manage a Node API and React front end. 

Downloading and running:
> Clone the Repo
> Run 'npm i' to install dependencies 
> Run 'npm run client' to start the client in dev mode
> Run 'npm run server' to start the server in dev mode
> Run 'npm start' to concurrently run the server and client

# API
This is a node/express API connected to a MongoDB Database. 
This API relies on the AWS SDK to connect to an S3 Bucket for file storage

From top level:
> npm run server

Dependencies
> aws-sdk
> body-parser
> express
> node-fetch
> nodemon

# React UI
React front end with extensive THREE.JS implementation for rendering and editing CAD files.

Dependencies
> react
> react-dom
> react-router-dom
> react-scripts
> three