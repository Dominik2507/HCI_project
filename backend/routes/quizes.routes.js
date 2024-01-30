var express = require('express');
var router = express.Router();

var db = require('../db');

router.get('/', async function(req, res, next) {
    let id = req.query.id;
    let quizes = await db.query('SELECT Quizes.title, Quizes.id, "user".username as author, Quizes.authorId as authorId, Categories.title as category, categoryId as categoryId, QuizTypes.name as quizType, quizTypeId, duration, image FROM Quizes, "user", Categories, QuizTypes \
    WHERE LOWER(Categories.title) = $1 AND "user".id = authorId AND Categories.id = categoryId AND QuizTypes.id = quizTypeId', [id]);
    let data = quizes.rows;
    res.status(200).json({
        data: data
    });
})

module.exports = router;