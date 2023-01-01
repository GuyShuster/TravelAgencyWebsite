import express from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { addUser, validateUserSchema, findUser, generatePasswordHash } from '../controllers/user.controller.js';
import config from '../config.js'

const router = express.Router();
const COOKIE_NAME = 'auth';

router.post('/sign-up', asyncHandler(async (req, res) => {
    const user = req.body;
    
    try {
        await validateUserSchema(user);
    } catch (error) {
        res.status(400).json(error.message);
        return;
    }

    try {
        await addUser(user);
        res.status(201).json(`Created user "${user.userName}"`);    
    } catch (error) {
        res.status(409).json(error.message)
    }
}));

router.get('/login', asyncHandler(async (req, res) => {
    const incomingUser = req.body;

    if (!incomingUser.userName || !incomingUser.password) {
        res.status(400).json('Must receive username and password');
        return;
    }

    const user = await findUser(incomingUser);
    
    if (!user) {
        res.status(404).json(`User ${incomingUser.userName} does not exist`);
        return;
    }

    if (user.password !== generatePasswordHash(incomingUser.password)) {
        res.status(404).json(`Wrong password for user ${incomingUser.userName}`);
        return;
    }
    
    const cookie = jwt.sign(user.userName, config.jwtSecret);
    res.cookie(COOKIE_NAME, cookie).status(200).json(`User ${user.userName} logged in successfuly`);
}));




export default router;