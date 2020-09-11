const express = require('express')
const router = express.Router()
const {getExamTitles, getExamQuestion, getExamQuestions } = require('../controllers/exams')

// ROUTES FOR 
// API/EXAMS

router.get('/', async (req, res) => {
    getExamTitles(req, res)
})

router.get('/:exam', async (req, res) => {
    getExamQuestions(req, res)
})

router.get('/:exam/:id', async (req, res) => {
    getExamQuestion(req, res)
})

module.exports = router