import express from 'express';
import config from './config.js';
import birds from './routes/test-a.js';
import dogs from './routes/test-b.js';

function addRoutes(app) {
    app.use('/birds', birds);
    app.use('/dogs', dogs);
    app.get('/', (req, res) => {
        res.send('Hello World!')
    });
}

function startListening(app, port) {
    app.listen(port, () => {
        // eslint-disable-next-line
        console.log(`Travel Agency listening on port ${port}`)
    });
}


const app = express();
addRoutes(app);
startListening(app, config.port);
