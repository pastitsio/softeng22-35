const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // TODO: add client-url when front-end is ready.
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    // Only on OPTIONS message.
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
})


const healthcheckRoutes = require('./healthcheck.routes');
const questionnaire_updRoutes = require('./questionnaire_upd.routes')
const resetallRoutes = require('./resetall.routes');
const resetqRoutes = require('./resetq.routes');


app.use('/healthcheck', healthcheckRoutes);
app.use('/questionnaire_upd', questionnaire_updRoutes);
app.use('/resetall', resetallRoutes);
app.use('/resetq', resetqRoutes);

module.exports = app;