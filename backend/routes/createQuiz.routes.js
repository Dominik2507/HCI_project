var express = require('express');
var router = express.Router();

var db = require('../db');

router.post('/', async function(req, res, next) {
    let author = await db.query('SELECT id FROM "user" WHERE $1 = token', [req.body.authorToken])
    let categoryId = await db.query('SELECT id FROM Categories WHERE title = $1', [req.body.category.title])
    let quiztypeid = await db.query('SELECT id FROM QuizTypes WHERE name = $1', [req.body.quizType.name])
    await db.query('INSERT INTO quizes (title, duration, image, categoryid, quiztypeid, authorid) VALUES ($1, $2, $3, $4, $5, $6)', [req.body.name, req.body.duration, req.body.image, categoryId.rows[0].id, quiztypeid.rows[0].id, author.rows[0].id]);
    let questions = req.body.questions;
    let quizId = await db.query('SELECT id FROM quizes WHERE title = $1', [req.body.name]);
    quizId = quizId.rows[0].id
    if (quiztypeid.rows[0].id != 5) {
        let i = 0;
        while (i < questions.length) {
            let element = questions[i];
            i++;
            await db.query('INSERT INTO questions (question, correctanswer, w1, w2, w3, quizid) VALUES ($1, $2, $3, $4, $5, $6)', [element.q, element.a, '', '', '', quizId]);
        }
    }
    else {
        let i = 0;
        while (i < questions.length) {
            let element = questions[i];
            i++;
            await db.query('INSERT INTO questions (question, correctanswer, w1, w2, w3, quizid) VALUES ($1, $2, $3, $4, $5, $6)', [element.q, element.a, element.wa1, element.wa2, element.wa3, quizId]);
    }
}
    res.status(200).json({
        data: quizId
    })
})

module.exports = router;