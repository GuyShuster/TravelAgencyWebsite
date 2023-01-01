import express from 'express';
import mongoose from 'mongoose';
import process from 'process';
import config from './config.js';
import flights from './routes/flights.route.js';

function initAppObject(app) {
    app.use(express.json());
}

function addApiRoutes(app) {
    app.use('/api/flights', flights);
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
    await connectToDB(config.dbURL);
    await startListening(app, config.port);

    // eslint-disable-next-line
    console.log(`Travel Agency listening on port ${config.port}!`);
}

try {
    await main();
} catch (error) {
    // eslint-disable-next-line
    console.log(`Error: ${error.message}`);
    process.exit(1);
}
