const colors = require('colors/safe');
const http = require('http');
const fs = require('fs');
const mongoose = require('mongoose');

const app = require('./app');

// fancy log
colors.enable();
const log = (x) => { console.log(colors.cyan.underline(x)); }

// app server
const server_port = process.env.PORT || 4000;
http.createServer(app).listen(server_port, () => { log(`Running https on port: {${server_port}}.`) });


// DB
mongoose.set('strictQuery', true);
const uri = `mongodb+srv://admin:${process.env.MONGO_ATLAS_PW}@softeng22-35-mongo-clus.js8eu1b.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri);
