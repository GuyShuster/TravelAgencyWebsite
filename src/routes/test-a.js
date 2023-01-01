import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Birds home page');
});


export default router;