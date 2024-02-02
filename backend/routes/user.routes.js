var express = require('express');
var router = express.Router();

var db = require('../db');

router.get('/', async function(req, res, next) {
    let token = req.query.token;
    let user_info = await db.query('SELECT username, id, email, token FROM "user" WHERE token = $1', [token]);
    user_info = user_info.rows[0];

    let id = user_info.id;

    let results = await db.query('SELECT solvedQuizes, solvedQuestion, timeSpentSolving FROM result WHERE userid = $1', [id]);
    results = results.rows;

    let quizes = await db.query('SELECT Quizes.title, Quizes.id, "user".username as author, Quizes.authorId as authorId, Categories.title as category, categoryId as categoryId, QuizTypes.name as quizType, quizTypeId, duration, image FROM Quizes, "user", Categories, QuizTypes \
    WHERE "user".id = $1 AND "user".id = authorId AND Categories.id = categoryId AND QuizTypes.id = quizTypeId', [id]);

    let data = {
        username: user_info.username,
        id: user_info.id,
        email: user_info.email,
        token: user_info.token,
        results: results,
        quizes: quizes.rows
    }

    res.status(200).json({
        data: data
    });
})

module.exports = router;