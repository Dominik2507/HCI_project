var express = require('express');
var router = express.Router();

var db = require('../db');

router.get('/', async function(req, res, next) {
    let id = req.query.id;
    let quizTypeId = await db.query('SELECT quizTypeId FROM quizes WHERE id = $1', [id]);
    let db_data = await db.query('SELECT question as q, correctAnswer as a, w1 as wa1, w2 as wa2, w3 as wa3 FROM Questions WHERE quizId = $1', [id]);

    let questions = []

    if (quizTypeId.rows[0].quiztypeid == 1) {
        db_data.rows.forEach((element) => {
            let question = {
                q: element.q,
                a: element.a
            };
            questions.push(question);
        })
    }

    let data = {
        quizId: parseInt(id),
        quizTypeId: quizTypeId.rows[0].quiztypeid,
        questions: questions
    }
    res.status(200).json({
        data: data
    })
})

module.exports = router;