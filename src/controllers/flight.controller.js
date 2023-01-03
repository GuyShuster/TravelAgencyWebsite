import Ajv from 'ajv/dist/jtd.js';
import Flight from '../models/flight.model.js';

const ajv = new Ajv();
const flightFilterSchema = {
    optionalProperties: {
        startingId: { type: 'string' },
        flyFrom: { type: 'string' },
        flyTo: { type: 'string' },
        dateRange: {
            optionalProperties: {
                from: { type: 'timestamp' },
                to: { type: 'timestamp' },
            }
        },
        priceRange: {
            optionalProperties: {
                from: { type: 'uint32' },
                to: { type: 'uint32' },
            }
        },
        seatsLeft: {
            type: 'uint32',
        },
        direction: {
            elements: {
                type: 'string'
            },
        },
    },
};
const validator = ajv.compile(flightFilterSchema);

function translateFilter(rawFilter) {
    const filterTranslations = {
        startingId: () => ({ _id: { $lt: rawFilter.startingId } }),
        flyFrom: () => ({ originCountry: rawFilter.flyFrom }),
        flyTo: () => ({ destinationCountry: rawFilter.flyTo }),
        dateRange: () => ({
            flightDateTime: {
                ...rawFilter.dateRange?.from && { $gte: rawFilter.dateRange?.from },
                ...rawFilter.dateRange?.to && { $lte: rawFilter.dateRange?.to },
            }
        }),
        priceRange: () => ({
            price: {
                ...rawFilter.priceRange?.from && { $gte: rawFilter.priceRange?.from },
                ...rawFilter.priceRange?.to && { $lte: rawFilter.priceRange?.to },
            }
        }),
        seatsLeft: () => ({ seatsLeft: { $gte: rawFilter.seatsLeft } }),
        direction: () => ({ direction: { $in: rawFilter.direction } }),
    };

    const translatedFilter = Object.keys(rawFilter).reduce((prevTranslatedFilter, currentRawFilterEntry) =>
        ({ ...prevTranslatedFilter, ...filterTranslations[currentRawFilterEntry]() }), {});

    return translatedFilter;
}

export async function getNextFlights(filter, maxAmount) {
    const translatedFilter = translateFilter(filter);
    const flights = await Flight.find(translatedFilter).sort({ _id: -1 }).limit(maxAmount);
    return flights;
}

export function checkFlightFilter(filter) {
    const valid = validator(filter);

    if (!valid) {
        const errors = ajv.errorsText(validator.errors);
        throw new Error(errors);
    }
}

export async function validateFlightSchema(flight) {
    const flightDoc = new Flight(flight);
    await flightDoc.validate();
}

export async function getFlightById(flightId) {
    const flight = await Flight.findById(flightId, { _id: 0 });
    return flight;
}

export async function addFlight(flight) {
    const createdFlight = await Flight.create(flight);
    return createdFlight?._id;
}

export async function deleteFlight(flightId) {
    const deletedFlight = await Flight.findByIdAndDelete(flightId);
    return deletedFlight?._id;
}

export async function decreaseFlightSeats(flightId, numOfTickets) {
    const flight = await Flight.findOne({ _id: flightId });
    
    if (!flight) {
        throw new Error('Could not find flight');
    }

    if (flight.seatsLeft < numOfTickets) {
        throw new Error('Not enough seats');
    }

    await Flight.findOneAndUpdate({ _id: flightId }, { $inc: { seatsLeft: -numOfTickets } });
}
