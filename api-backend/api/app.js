const express = require('express');
const app = express();




// Logger
const morgan = require('morgan');
app.use(morgan('dev'));

// Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// This is needed because the server will run on another port, so CORS must be enabled.
// So headers are appended to every response is sent to the client.
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

// Routes that handle requests
const questionnaireRoutes = require('./routes/questionnaire.routes');
app.use('/questionnaire', questionnaireRoutes);

const doanswerRoutes = require('./routes/doanswer.routes');
app.use('/doanswer', doanswerRoutes);


const questionRoutes = require('./routes/question.routes');
app.use('/question', questionRoutes);

var healthcheckRoutes = require('./routes/healthcheck.routes');
app.use('/healthcheck', healthcheckRoutes);

// If execution gets here, req was not handled by routes above,
// so there's an error.
app.use((req, res, next) => {
    const error = new Error('Not found!');
    error.status = 404;
    next(error);
});

// handles error from everywhere in the application, i.e. when SQL is added
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
