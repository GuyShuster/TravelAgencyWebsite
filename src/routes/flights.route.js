import express from 'express';
import asyncHandler from 'express-async-handler';
import { addFlight, getFlightById, checkFlightFilter, getNextFlights, deleteFlight, validateFlightSchema, decreaseFlightSeats } from '../controllers/flight.controller.js';
import { updateUserFlight } from '../controllers/user.controller.js';
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

router.post('/', verifyAuthentication, verifyAdmin, asyncHandler(async (req, res) => {
    const flight = req.body;

    try {
        await validateFlightSchema(flight);
    } catch (error) {
        res.status(400).json(error.message);
        return;
    }

    const flightId = await addFlight(flight);
    res.status(201).json(flightId);
}));

router.delete('/:flightId', verifyAuthentication, verifyAdmin, asyncHandler(async (req, res) => {
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

router.put('/:flightId/order-flight', verifyAuthentication, asyncHandler(async (req, res) => {
    const { flightId } = req.params;
    const { numOfTickets, creditCard } = req.body;

    if (!numOfTickets || !creditCard.number || !creditCard.cvv || !creditCard.expiryMonth || !creditCard.expiryYear) {
        res.status(400).json('Missing credit card info or numOfTickets');
        return;
    }

    try {
        await decreaseFlightSeats(flightId, numOfTickets);
    } catch (error) {
        res.status(404).json(error.message);
        return;
    }

    try {
        await updateUserFlight(req.user, flightId, numOfTickets);
    } catch (error) {
        res.status(404).json(error.message);
        return;
    }

    res.status(200).json(`Ordered flight ${flightId} for user ${req.user} successfully`);
}));

export default router;