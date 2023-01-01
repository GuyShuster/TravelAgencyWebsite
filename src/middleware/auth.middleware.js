import jwt from 'jsonwebtoken';
import config from '../config.js'

export function verifyAuthentication(req, res, next) {
    const cookie = req.cookies[config.authCookieName];

    if (!cookie) {
        return res.sendStatus(403);
    }

    try {
        const data = jwt.verify(cookie, config.jwtSecret);
        req.user = data.userName;
        req.isAdmin = data.isAdmin;
        return next();
    } catch {
        return res.sendStatus(403);
    }
}

export function verifyAdmin(req, res, next) {
    if (!req.isAdmin) {
        return res.sendStatus(403);
    }
    return next();
}
