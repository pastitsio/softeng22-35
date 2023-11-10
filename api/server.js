const colors = require('colors/safe');
require('dotenv').config();

const app = require('./app');
const db = require('./db');

// fancy log
colors.enable();
const fancyLog = (x) => { console.log(colors.cyan.underline(`[my app] ${x}`)); }

// DB
const uri = `mongodb+srv://admin:${process.env.MONGO_ATLAS_PW}@${process.env.MONGO_ATLAS_CLUSTER}/?retryWrites=true&w=majority`;

// runtime
const host = process.env.APP_HOST || "localhost";
const port = process.env.APP_PORT || 5000;

// run
const spinServer = async () => {
    try {
        fancyLog(await db.connect(uri));
        app.listen(port, () =>
            fancyLog(`Running on http://${host}:${port}/...`)
        );
    } catch (error) {
        console.error(error);
    }
};

spinServer();