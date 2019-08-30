## CADL - An open source CAD Library with 3D rendering

Designed and built to host a variety of CAD files at NoiseBridge Hackerspace, CADL is an open source tool for anyone who wants to visualize and share a variety of CAD projects.

## Installing and running

> Clone the Repo
> Run 'npm i' to install dependencies 
> 

# API
This is a node/express API connected to a MongoDB Database. 
This API relies on the AWS SDK to connect to an S3 Bucket for file storage

From top level:
> 

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