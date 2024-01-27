var express = require('express');
var router = express.Router();

var db = require('../db');

router.get('/', async function(req, res, next) {
    let id = 4;
    let quizTypeId = await db.query('SELECT quizTypeId FROM quizes WHERE id = $1', [id]);
    let db_data = await db.query('SELECT question as q, correctAnswer as a, w1, w2, w3 FROM Questions WHERE quizId = $1', [id]);
    let data = {
        quizId: id,
        quizTypeId: quizTypeId.rows[0].quizTypeId,
        questions: db_data.rows
    }
    res.status(200).json({
        data: data
    })
})

module.exports = router;