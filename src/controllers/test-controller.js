import Test from '../models/test-model.js'

export default {
    async getAllArticles() {
        const allArticles = await Test.find();
        return allArticles;
    }
};