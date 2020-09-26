// PUBLIC ROUTE
// GET /API/FLASHCARDS/
// RETURNS ARRAY OF FLASHCARD TITLES AS STRINGS
titles = async (req, res, next) => {
    return res.status(200).json({"result": "success", "route": "api/flashcards/titles"})
}

// PUBLIC ROUTE
// GET /API/FLASHCARDS/
// RETURNS ARRAY OF FLASHCARD TITLES AS STRINGS
categories = async (req, res, next) => {
    return res.status(200).json({"result": "success", "route": "api/flashcards/categories"})
}

module.exports = { titles, categories }