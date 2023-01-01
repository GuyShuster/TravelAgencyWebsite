import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
    // TODO: maybe add image
    originCountry: {
        type: String,
        required: true,
    },
    destinationCountry: {
        type: String,
        required: true,
    },
    flightDateTime: {
        type: Date,
        required: true,
    },
    price: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
    },
    seatsLeft: {
        type: Number,
        required: true,
        min: 0,
    },
});

const Flight = mongoose.model('Flight', flightSchema);

export default Flight;