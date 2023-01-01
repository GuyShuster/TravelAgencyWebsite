import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import process from 'process';
import console from 'console';
import config from './config.js';
import flights from './routes/flights.route.js';
import users from './routes/users.route.js';

function initAppObject(app) {
    app.use(express.json());
    app.use(cookieParser());
}

function addApiRoutes(app) {
    app.use('/api/flights', flights);
    app.use('/api/users', users);
}

function addServerErrorWrapper(app) {
    // eslint-disable-next-line
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Uncaught server error')
    });
}

async function connectToDB(dbURL) {
    await mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
}

function startListening(app, port) {
    return new Promise((resolve, reject) => {
        app.listen(port)
            .once('listening', resolve)
            .once('error', reject);
    });
}

async function main() {
    const app = express();

    initAppObject(app);
    addApiRoutes(app);
    addServerErrorWrapper(app);
    await connectToDB(config.dbURL);
    await startListening(app, config.port);

    console.log(`Travel Agency listening on port ${config.port}!`);
}

try {
    await main();
} catch (error) {
    console.error(error.message);
    process.exit(1);
}
