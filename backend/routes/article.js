const express = require('express');
const Article = require('../models/Article');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Submit an article
router.post('/', auth, async (req, res) => {
    const { title, content } = req.body;
    try {
        const article = new Article({ title, content, user: req.user.id });
        await article.save();
        res.status(201).json(article);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// // Get all articles (for admin)
// router.get('/', auth, async (req, res) => {
//     try {
//         if (req.user.role !== 'admin') {
//             return res.status(403).json({ msg: 'Access denied' });
//         }
//         const articles = await Article.find().populate('user', ['name', 'email']);
//         res.status(200).json(articles);
//     } catch (err) {
//         res.status(500).json({ msg: 'Server error' });
//     }
// });

// GET /api/articles - Get all articles
router.get('/', async (req, res) => {
    try {
        const articles = await Article.find().sort({ createdAt: -1 });
        res.json(articles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// GET /api/articles/:id - Get single article by ID
router.get('/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);

        if (!article) {
            return res.status(404).json({ msg: 'Article not found' });
        }

        res.json(article);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
