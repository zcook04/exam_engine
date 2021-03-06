const express = require('express')
const router = express.Router()
const {getExamTitles, getExamQuestion, getExamQuestions, getExamCategories } = require('../controllers/exams')

// ROUTES FOR 
// API/EXAMS

router.get('/', async (req, res) => {
    getExamTitles(req, res)
})

router.get('/:exam', async (req, res) => {
    getExamQuestions(req, res)
})

router.get('/:exam/categories', async (req, res) => {
    getExamCategories(req, res)
    // Will return array of objects containing specified exams
    // categories and their count
})

router.get('/:exam/id/:id', async (req, res) => {
    getExamQuestion(req, res)
})

module.exports = router