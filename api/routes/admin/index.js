const express = require('express');
const router = express.Router();

const healthcheck = require('./healthcheck.routes');
const questionnaire_upd = require('./questionnaire_upd.routes')
const resetall = require('./resetall.routes');
const resetq = require('./resetq.routes');

// for `app.com/admin/[routes]`
router.use('/healthcheck', healthcheck);
router.use('/questionnaire_upd', questionnaire_upd);
router.use('/resetall', resetall);
router.use('/resetq', resetq);

module.exports = router;