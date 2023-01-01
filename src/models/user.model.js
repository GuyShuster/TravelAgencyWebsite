import mongoose from 'mongoose';

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
        mongoose.Schema.Types.ObjectId,
    ],
});

const User = mongoose.model('User', userSchema);

export default User;