import express from 'express';
import testController from '../controllers/test-controller.js';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const articles = await testController.getAllArticles();
        
        if (!articles.length) {
            res.status(404).json('There are no article published yet!');
        } else {
            res.json(articles);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});


export default router;