const Question = require ('../models/Exam')
const shuffleArray = require('../utils/utils')

// PUBLIC ROUTE
// GET /API/EXAMS/
// RETURNS ARRAY OF EXAM TITLES AS STRINGS
getExamTitles = async (req, res, next) => {
    let allExamTitles = []
    
    try{
        exams = await Question.find()
        //GETS EXAM TITLES
        exams.forEach(exam => {
            if(!allExamTitles.includes(exam.exam)) {
                allExamTitles.push(exam.exam)
            }
        })
    } catch (err) {
        console.log(err)
    }
    return res.json(allExamTitles)
}

// PUBLIC ROUTE
// GET /API/EXAMS/:EXAM/ID/:ID
// RETURNS QUESTION OBJECT IF QUESTION EXISTS
getExamQuestion = async (req, res, next) => {
    const id = req.params.id
    let question
    try {
        await Question.find({_id: id}, (err, result) =>{
            if(err){
                console.log(err)
                return
            }
            question = result
        })} catch(err) {
            console.log('TryCaught:' +err)
        }
        if(typeof(question[0]) !== undefined && question[0]){
            return res.send(question[0])
        } else {
            return res.send({})
        }
}

// PUBLIC ROUTE
// GET /API/EXAMS/:EXAM
// RETURNS SHUFFLED ARRAY OF QUESTION OBJECTS FOR SPECIFIED EXAM
getExamQuestions = async (req, res, next) => {
        //PULL EXAM, CATEGORIES AND QUANTITY FROM URL
        const exam = req.params.exam
        const categories = Object.entries(req.query)
        //GET ALL QUESTIONS FOR THE SPECIFIED EXAM
        let allExamQuestions = []
        try {
            await Question.find({exam}, (err, result) =>{
                
                if(err){
                    console.log(err)
                    return
                }
                allExamQuestions = result
                
            })} catch(err) {
                console.log('TryCaught:' +err)
            }
        // CHECK TO SEE IF CATEGORY QUERY PARAMETERS WERE ADDED
        if(categories.length >= 1) {
            return res.status(200).json(categoryQuestions(allExamQuestions, req.query))
        } else {
            return res.status(200).json(allExamQuestions)
        }
}

getExamCategories = async (req, res) => {
    const { exam } = req.params
    try {
        let allQuestions = await Question.find({exam}) 
        const categoryPlaceholder = []
        const categories = []

        allQuestions.forEach(question => {
            if(categoryPlaceholder.indexOf(question.category) === -1 ){
                let count = 0
                allQuestions.forEach(innerQuestion => {
                    if(innerQuestion.category === question.category)
                    count++
                })
                categoryPlaceholder.push(question.category)
                categories.push({name: question.category, count, max: count })
            }
        })
        if(categories.length > 0)
            return res.status(200).json(categories)
    }catch(err) {
        console.log('TryCaught:' +err)
        return res.status(500).json({success: false, msg: `An interal error occured: ${err}`})
    }
    return res.status(404).json({success: false, msg: `No Categories Exist for exam: ${exam.toUpperCase()}`})
}

// FILTER QUESTIONS BY CATEGORY AND COUNT SPECIFIED IN PARAM
const categoryQuestions = (questions, categories) => {
    const filteredQuestions = []
    for (let key in categories) {
        let currentQuestions = questions.filter(question => question.category === key)
        currentQuestions = currentQuestions.slice(0, categories[key])
        filteredQuestions.push(currentQuestions)
        }
    return shuffleArray(filteredQuestions.flat())
}



module.exports = {getExamTitles, getExamQuestion, getExamQuestions, getExamCategories}