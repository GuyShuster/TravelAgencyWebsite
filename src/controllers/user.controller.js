import crypto from 'crypto';
import User from '../models/user.model.js';

export function generatePasswordHash(password) {
    return crypto.createHash('md5').update(password).digest('hex');
}

export async function validateUserSchema(user) {
    const userDoc = new User(user);
    await userDoc.validate();
}

export async function addUser(newUser) {
    const user = await User.findOne({ userName: newUser.userName })
    
    if (user) {
        throw new Error(`User "${newUser.userName}" already exists`);
    }
    
    if (newUser.isAdmin) {
        const admin = await User.findOne({ isAdmin: true });

        if (admin) {
            throw new Error(`Can't make "${newUser.userName}" admin, there is already one`);
        }
    }

    await User.create({ ...newUser, password: generatePasswordHash(newUser.password) });
}

export async function findUser(incomingUser) {
    const user = await User.findOne({ userName: incomingUser.userName });
    return user;
}
