import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Dogs home page');
});


export default router;