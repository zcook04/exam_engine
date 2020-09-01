const mongoose = require('mongoose')

const radioQuestionSchema = new mongoose.Schema ({
    exam: { type: String, required: true },
    category: { type: String, required: true },
    question: {type: String, required: true},
    questionType: {type: String, required: true},
    isPublished: {type: Boolean, required: true},
    prompt1: {type: String, required: true},
    prompt2: {type: String, required: true},
    prompt3: {type: String, required: true},
    prompt4: {type: String, required: true},
    answers: {type: [Boolean], required: true},
    rating: [],
    explainations: [{ 
        id: String,
        questionId: String,
        userId: String,
        text: String,
        ratings:  [Number],
        comments: [String]
    }],
    date: Date
})

const RadioQuestion = mongoose.model('RadioQuestion', radioQuestionSchema)


//TESTING---CREATE DB ENTRIES BELOW

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