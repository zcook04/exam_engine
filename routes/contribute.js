const express = require('express')
const router = express.Router()
const Question = require('../models/Exam')

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





// TESTING---CREATE DB ENTRIES BELOW

// const question1 = new RadioQuestion({
//     exam: 'CCNA',
//     category: 'Switching',
//     question: 'What is a broadcast address used for?',
//     questionType: "Radio",
//     isPublished: true,
//     prompt1: 'To route packets',
//     prompt2: 'To reply to an arp',
//     prompt3: 'To broadcast a message to all devices on a given subnet',
//     prompt4: 'To tell people where the broadcast is',
//     answers: [false, false, true, false],
//     rating: [{user: 'user1', rating: 4}, {user: 'user2', rating: 5}],
//     contributedBy: 'Zack',
//     explainations: [{ 
//         id: '123',
//         questionId: 'Id of Q',
//         userId: 'Zack',
//         text: 'Broadcasts sent to the broadcasat address of a subnet to send packets to all available hosts on that network.',
//         ratings:  [2,4,5],
//         comments: ['Great Question!', 'Ugg...This makes no sense!']
//     }],
//     date: new Date()
// })

// question1.save((err) => {
//     if(err) console.error(err)
// })