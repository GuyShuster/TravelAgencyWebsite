import express from 'express';
import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import { addFlight, getFlightById, checkFlightFilter, getNextFlights, deleteFlight } from '../controllers/flight.controller.js';
import { verifyAuthentication, verifyAdmin } from '../middleware/auth.middleware.js';
import config from '../config.js';
import { Types } from 'mongoose';

const router = express.Router();

function isFlightIdValid(flightId) {
    return !Types.ObjectId.isValid(flightId);
}

router.get('/', asyncHandler(async (req, res) => {
    const filter = req.body;

    try {
        checkFlightFilter(filter);
    } catch (error) {
        res.status(400).json(`Flight filter structure error: ${error.message}`);
        return;
    }

    const flights = await getNextFlights(filter, config.maxFlightsPerPage);
    res.json(flights);
}));

router.get('/:flightId', asyncHandler(async (req, res) => {
    const { flightId } = req.params;

    if (isFlightIdValid(flightId)) {
        res.status(400).json('Invalid flight id');
        return;
    }

    const flight = await getFlightById(flightId);

    if (!flight) {
        res.status(404).json(`No flight with id ${flightId} has been found`);
    } else {
        res.json(flight);
    }
}));

// TODO validate mongoose schema
router.post('/', verifyAuthentication, verifyAdmin, asyncHandler(async (req, res) => {
    const flight = req.body;

    try {
        const flightId = await addFlight(flight);
        res.status(201).json(flightId);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).json(error.message);
        } else {
            throw error;
        }
    }
}));

router.delete('/:flightId', asyncHandler(async (req, res) => {
    const { flightId } = req.params;

    if (isFlightIdValid(flightId)) {
        res.status(400).json('Invalid flight id');
        return;
    }

    const deletedFlightId = await deleteFlight(flightId);

    if (!deletedFlightId) {
        res.status(404).json(`Flight with id ${flightId} wasn't found`);
        return;
    }

    res.status(200);
}));

export default router;