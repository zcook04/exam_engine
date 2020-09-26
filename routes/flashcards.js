const express = require('express');
const router = express.Router();
const { titles, categories, getCards } = require('../controllers/flashcards');

// GET api/flashcards/titles
// public
// returns array of strings representing each flashcard title
router.get('/titles', async (req, res) => await titles(req, res))

// GET api/flashcards/categories
// public
// returns array of strings representing each flashcard title
router.get('/categories', async (req, res) => await categories(req, res))

// GET api/flashcards/getCards
// public
// returns array of strings representing each flashcard title
router.get('/getcards', async (req, res) => await getCards(req, res))

module.exports = router;
