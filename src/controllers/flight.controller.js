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
    };

    const translatedFilter = Object.keys(rawFilter).reduce((prevTranslatedFilter, currentRawFilterEntry) =>
        ({ ...prevTranslatedFilter, ...filterTranslations[currentRawFilterEntry]() }), {});

    return {
        ...translatedFilter,
        seatsLeft: { $gt: 0 }
    };
}

export function checkFlightFilter(filter) {
    const valid = validator(filter);

    if (!valid) {
        const errors = ajv.errorsText(validator.errors);
        throw new Error(errors);
    }
}

export async function getNextFlights(filter, maxAmount) {
    const translatedFilter = translateFilter(filter);
    const flights = await Flight.find(translatedFilter).sort({ _id: -1 }).limit(maxAmount);
    return flights;
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
