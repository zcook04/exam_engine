const express = require('express');
const router = express.Router();
const { flashcardList } = require('../controllers/flashcards');

// GET api/flashcards/
// public
// returns array of strings representing each flashcard title
router.get('/flashcardList', async (req, res) => await flashcardList(req, res))

module.exports = router;
