var express = require('express');
var router = express.Router();

var db = require('../db');

router.get('/', async function(req, res, next) {
    let categories = await db.query('SELECT name FROM QuizTypes');
    let data = categories.rows;
    res.status(200).json({
        data: data
    });
})

module.exports = router;