const express = require('express')
const router = express.Router()
const Question = require('../models/Exam')


// api/contribute/
router.post('/question', async (req, res) => {

    const { exam, category, question, questionType, prompts, explainations, contributedBy} = req.body

    try {
        let questionExists = await Question.findOne({ question })
        if(questionExists) {
            console.log('Question Exists')
            return res.status(400).json({ msg: 'Questions already exists'})
        } else{
            contributeQuestion = new Question({
                exam, category, question, questionType,
                prompts, explainations, contributedBy
            })

            console.log(contributeQuestion)
            const savedQuestion = await contributeQuestion.save((err, response) => {
                if(err) {
                    console.log(err)
                    return res.status(500).json({msg: err})
                } else {
                    console.log(savedQuestion)
                    return res.status(200).json({ msg: 'Saved Successfully'})
                }
            
            })    
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Server Error'})
    }
})

module.exports = router