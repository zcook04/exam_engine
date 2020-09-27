const express = require('express');
const router = express.Router();
const { titles, getCards, addCard, getFlashcardCategories } = require('../controllers/flashcards');

// GET api/flashcards/titles
// public
// returns array of strings representing each flashcard title
router.get('/titles', async (req, res) => await titles(req, res))

// GET api/flashcards/getCards
// public
// returns array of strings representing each flashcard title
router.get('/getcards/:exam', async (req, res) => await getCards(req, res))

// GET api/flashcards/:exam/categories
// Will return array of objects containing specified exams
// categories and their count
router.get('/:exam/categories', async (req, res) => {
    getFlashcardCategories(req, res)
})

// POST api/flashcards/addCard
// public
// adds flashcard to exam
router.post('/addcard', async (req, res) => await addCard(req, res))

module.exports = router;
