const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');

const app = express();

const adminRoutes = require('./routes/admin.routes');
const questionRoutes = require('./routes/question.routes');
const questionnaireRoutes = require('./routes/questionnaire.routes');
const doanswerRoutes = require('./routes/doanswer.routes');
const getSessionAnswersRoutes = require('./routes/getsessionanswers.routes');
const getQuestionAnswersRoutes = require('./routes/getquestionanswers.routes');

// Logger
app.use(morgan('dev'));

// Parser
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
app.use('/admin', adminRoutes);
app.use('/question', questionRoutes);
app.use('/questionnaire', questionnaireRoutes);
app.use('/doanswer', doanswerRoutes);
app.use('/getsessionanswers', getSessionAnswersRoutes);
app.use('/getquestionanswers', getQuestionAnswersRoutes);

// If execution gets here, req was not handled by routes above,
// so there's an error.
app.use((req, res, next) => {
    const error = new Error('Not found!');
    error.status = 404;
    next(error);
});

// handles error from everywhere in the application, also from above.
// i.e. when DB is added
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        success: false,
        message: error.message

    });
});

module.exports = app;

