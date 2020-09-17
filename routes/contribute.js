const express = require('express');
const router = express.Router();
const { getExamList, addExam, addQuestion } = require('../controllers/contribute');

// api/contribute/question
// public
// Stores contributed question in questions collection
// and sets published to false
router.post('/question', async (req, res) => await addQuestion(req, res));

// GET api/contribute/examlist
// public
// returns array of exams from exams_db
router.get('/examlist', async (req, res) => await getExamList(req, res))

// POST api/contribute/examlist
// private
// returns array of exams from exams_db
router.post('/examlist', async (req, res) => await addExam(req, res))

module.exports = router;
