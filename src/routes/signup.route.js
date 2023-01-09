import express from 'express';
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/', asyncHandler(async (_req, res) => {
    res.render('signup');
}));

export default router;