import mongoose from 'mongoose';

const flightSubSchema = new mongoose.Schema({
    flightId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    numOfSeats: {
        type: Number,
    }
}, { _id: false });

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    flights: [
        flightSubSchema
    ],
    creditCard: {
        number: {
            type: String,
        },
        cvv: {
            type: String,
        },
        expiryMonth: {
            type: Number,
        },
        expiryYear: {
            type: Number,
        },
    }
});

const User = mongoose.model('User', userSchema);

export default User;