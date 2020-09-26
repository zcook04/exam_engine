// PUBLIC ROUTE
// GET /API/FLASHCARDS/
// RETURNS ARRAY OF FLASHCARD TITLES AS STRINGS
titles = async (req, res, next) => {
    return res.status(200).json({"result": "success", "route": "api/flashcards/titles"})
}

// PUBLIC ROUTE
// GET /API/FLASHCARDS/
// RETURNS ARRAY OF FLASHCARD CATEGORIES AS STRINGS
categories = async (req, res, next) => {
    return res.status(200).json({"result": "success", "route": "api/flashcards/categories"})
}

// PUBLIC ROUTE
// GET /API/FLASHCARDS/
// RETURNS ARRAY OF FLASHCARD OBJECTS
getCards = async (req, res, next) => {
    return res.status(200).json({"result": "success", "route": "api/flashcards/getcards"})
}

module.exports = { titles, categories, getCards }