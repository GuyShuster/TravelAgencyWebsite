import express from 'express';
import { addFlight, getFlightById, checkFlightFilter, getNextFlights } from '../controllers/flight.controller.js';
import config from '../config.js';
import { Types } from 'mongoose';
const router = express.Router();

router.get('/', async (req, res) => {
    const filter = req.body;
    
    try {
        checkFlightFilter(filter);
    } catch (error) {
        res.status(400).json(`Flight filter structure error: ${error.message}`);
        return;
    }

    try {
        const flights = await getNextFlights(filter, config.maxFlightsPerPage);
        res.json(flights);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/:flightId', async (req, res) => {
    const { flightId } = req.params;

    if (!Types.ObjectId.isValid(flightId)) {
        res.status(400).json('Invalid flight id');
        return;
    }
    
    try {
        const flight = await getFlightById(flightId);

        if (!flight) {
            res.status(404).json(`No flight with id ${flightId} has been found`);
        } else {
            res.json(flight);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// TODO: maybe add an 'already exists validation'
router.post('/', async (req, res) => {
    const flight = req.body;
    
    try {
        const flightId = await addFlight(flight);
        res.status(201).json(flightId);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});



export default router;