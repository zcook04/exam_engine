const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema ({
    exam: { type: String, required: true },
    category: { type: String, required: true },
    question: {type: String, required: true},
    questionType: {type: String, required: true},
    isPublished: {type: Boolean, required: true, default: false},
    prompts: [
        {
            prompt: { 
                text: {
                    type: String, required: true
                },
                isAnswer: {
                    type: Boolean, required: true
                }}
        }],
    rating: [],
    explainations: [{ 
        contributedBy: String,
        text: String,
        ratings:  [Number],
        comments: [String]
    }],
    date: {
        type: Date,
        default: Date.now()
    },
    contributedBy: {
        type: String,
        required: true
    }
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question