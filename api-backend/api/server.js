const colors = require('colors/safe');
const https = require('https');
const fs = require('fs');
// const mysql = require('mysql');
const mongoose = require('mongoose');

const app = require('./app');

// fancy log
colors.enable();
const log = colors.cyan.underline

// app server
const server_port = process.env.PORT || 4000;
https
    .createServer(
        {
            key: fs.readFileSync('auth/key.pem'),
            cert: fs.readFileSync('auth/cert.pem'),
        },
        app
    ).listen(server_port, () => { console.log(log(`Running on port: {${server_port}}.`)) });


// DB
console.log(log(`Attempting to connect to database {${process.env.DB_NAME}}`))


const uri = `mongodb+srv://admin:${process.env.MONGO_ATLAS_PW}@softeng22-35-mongo-clus.js8eu1b.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri);
mongoose.set('strictQuery', true);
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });

// module.exports.connection = connection;


