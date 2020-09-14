const express = require('express');
const router = express.Router();
const Question = require('../models/Exam');
const ExamsCollection = require('../models/ExamsCollection');

// api/contribute/question
// public
// Stores contributed question in questions collection
// and sets published to false
router.post('/question', async (req, res) => {
  const {
    exam,
    category,
    question,
    questionType,
    prompts,
    explainations,
    contributedBy,
    answer,
  } = req.body;

  try {
    let questionExists = await Question.findOne({ question });
    if (questionExists) {
      console.log('Question Exists');
      return res.status(400).json({ msg: 'Questions already exists' });
    } else {
      contributeQuestion = new Question({
        exam,
        category,
        question,
        answer,
        questionType,
        prompts,
        explainations,
        contributedBy,
      });

      await contributeQuestion.save((err, response) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ msg: err, data: response });
        } else {
          return res.status(200).json({ msg: 'Saved Successfully' });
        }
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

// GET api/contribute/examlist
// public
// returns array of exams from exams_db
router.get('/examlist', async (req, res) => {
  try {
    const allExams = await ExamsCollection.find();
    res.status(200).json(allExams)
  } catch(err) {
    console.log(err)
    return res.status(500).json({ success: false, msg: 'Server error'})
  }
})

// POST api/contribute/examlist
// private
// returns array of exams from exams_db
router.post('/examlist', async (req, res) => {
  try {
    const { exam, categories } = req.body
    const newExam = new ExamsCollection({ exam, categories})
    await newExam.save((err, response) => {
      if (err) {
        console.log(err)
        return res.status(400).json({msg: err, data: response})
      } else{
        return res.status(200).json({ msg: 'Saved successfully'})
      }
    })
  } catch (err) {
    console.log(err) 
      return res.status(500).json({ success: false, msg: 'Server Error'})
  }

})

module.exports = router;
