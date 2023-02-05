const colors = require('colors/safe');
const https = require('https');
const fs = require('fs');
const mysql = require('mysql');

const app = require('./app');

// fancy log
colors.enable();
const log = colors.cyan.underline

const server_port = process.env.PORT || 4000;

https
    .createServer(
        {
            key: fs.readFileSync('auth/key.pem'),
            cert: fs.readFileSync('auth/cert.pem'),
        },
        app
    ).listen(server_port, () => { console.log(log(`Running on port: ${server_port}.`)) });


// DB
console.log(log(`Attempting to connect to database ${process.env.DB_NAME}`))

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASS,
  //  database : 'TOBEANNOUNCED' // TODO: put the  name 
});


connection.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');
});

module.exports.connection = connection;


