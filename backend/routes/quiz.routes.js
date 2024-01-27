var express = require('express');
var router = express.Router();

var db = require('../db');

router.get('/', async function(req, res, next) {
    let id = 4;
    let quizes = await db.query('SELECT Quizes.title, Quizes.id, "user".username as author, authorId, Categories.title as category, categoryId, QuizTypes.name as quizType, quizTypeId, duration, image FROM Quizes, "user", Categories, QuizTypes \
    WHERE Quizes.id = $1 AND "user".id = authorId AND Categories.id = categoryId AND QuizTypes.id = Quizes.quizTypeId', [id]);
    let data = quizes.rows;
    res.status(200).json({
        data: data[0]
    })
})

module.exports = router;