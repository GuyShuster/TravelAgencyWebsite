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
    direction: {
        type: String,
        enum: ['one-way', 'two-way'],
        required: true,
    }
});

const Flight = mongoose.model('Flight', flightSchema);

export default Flight;