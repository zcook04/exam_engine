const express = require('express');
const router = express.Router();
const { titles, getCards, addCard } = require('../controllers/flashcards');

// GET api/flashcards/titles
// public
// returns array of strings representing each flashcard title
router.get('/titles', async (req, res) => await titles(req, res))

// GET api/flashcards/getCards
// public
// returns array of strings representing each flashcard title
router.get('/getcards/:exam', async (req, res) => await getCards(req, res))

// POST api/flashcards/addCard
// public
// adds flashcard to exam
router.post('/addcard', async (req, res) => await addCard(req, res))

module.exports = router;
