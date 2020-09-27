const ExamsCollection = require('../models/ExamsCollection');
const Flashcard = require('../models/Flashcards')

// PUBLIC ROUTE
// GET /API/FLASHCARDS/
// RETURNS ARRAY OF FLASHCARD TITLES AND CATEGORIES AS STRINGS
const titles = async (req, res, next) => {
    try {
        const exams = await ExamsCollection.find();
        res.status(200).json(exams)
      } catch(err) {
        console.log(err)
        return res.status(500).json({ success: false, msg: 'Server error'})
      }
}

// PUBLIC ROUTE
// POST /API/FLASHCARDS/
// Adds flashcard
const addCard = async (req, res, next) => {
    const {
        exam,
        category,
        sidea,
        sideb,
        explainations,
        contributedBy
    } = req.body;
    
    try {
        contributeFlashcard = new Flashcard({
            exam,
            category,
            sidea,
            sideb,
            explainations,
            contributedBy,
        });
        await contributeFlashcard.save((err, response) => {
            if (err) {
            console.log(err);
            return res.status(500).json({ msg: err, data: response });
            } else {
            return res.status(200).json({ msg: 'Saved Successfully' });
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Server Error' });
    }
}

// PUBLIC ROUTE
// GET /API/FLASHCARDS/:exam
// RETURNS ARRAY OF FLASHCARD OBJECTS
const getCards = async (req, res, next) => {
            //PULL EXAM, CATEGORIES AND QUANTITY FROM URL
            const exam = req.params.exam
            const categories = Object.entries(req.query)
            //GET ALL QUESTIONS FOR THE SPECIFIED EXAM
            let allFlashcards = []
            try {
                await Flashcard.find({exam}, (err, result) =>{
                    if(err){
                        console.log(err)
                        return
                    }
                    allFlashcards = result
                })} catch(err) {
                    console.log('TryCaught:' +err)
                }
            // CHECK TO SEE IF CATEGORY QUERY PARAMETERS WERE ADDED
            if(categories.length >= 1) {
                return res.status(200).json(flashcardsByCategory(allFlashcards, req.query))
            } else {
                return res.status(200).json(allFlashcards)
            }
}

const getFlashcardCategories = async (req, res, next) => {
    const { exam } = req.params
    try {
        let allFlashcards = await Flashcard.find({exam})
        const categoryPlaceholder = []
        const categories = []

        allFlashcards.forEach(flashcard => {
            if(categoryPlaceholder.indexOf(flashcard.category) === -1 ){
                let count = 0
                allFlashcards.forEach(innerflashcard => {
                    if(innerflashcard.category === flashcard.category)
                    count++
                })
                categoryPlaceholder.push(flashcard.category)
                categories.push({name: flashcard.category, count, max: count })
            }
        })
        if(categories.length > 0){
            return res.status(200).json(categories)
        }
            
    }catch(err) {
        return res.status(500).json({success: false, msg: `An interal error occured: ${err}`})
    }
    return res.status(204).json('')
}

const flashcardsByCategory = (flashcards, categories) => {
    const filteredFlashcards = []
    for (let key in categories) {
        let currentFlashcards = flashcards.filter(flashcard => flashcard.category === key)
        currentFlashcards = currentFlashcards.slice(0, categories[key])
        filteredFlashcards.push(currentFlashcards)
        }
    return shuffleArray(filteredFlashcards.flat())
}

module.exports = { titles, getCards, addCard, getFlashcardCategories }