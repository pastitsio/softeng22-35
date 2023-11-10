const cors = require("cors");
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');

const adminRoutes = require('./routes/admin');
const questionRoutes = require('./routes/question.routes');
const questionnaireRoutes = require('./routes/questionnaire.routes');
const doanswerRoutes = require('./routes/doanswer.routes');
const getSessionAnswersRoutes = require('./routes/getsessionanswers.routes');
const getQuestionAnswersRoutes = require('./routes/getquestionanswers.routes');
const sessionRoutes = require('./routes/sessions.routes');


const app = express();
app.use(cors())
// Logger
app.use(morgan('dev'));

// Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes that handle requests
app.use('/admin', adminRoutes);
app.use('/question', questionRoutes);
app.use('/questionnaire', questionnaireRoutes);
app.use('/doanswer', doanswerRoutes);
app.use('/getsessionanswers', getSessionAnswersRoutes);
app.use('/getquestionanswers', getQuestionAnswersRoutes);
app.use('/session', sessionRoutes);

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

