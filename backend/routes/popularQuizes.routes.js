var express = require('express');
var router = express.Router();

var db = require('../db');

router.get('/', async function(req, res, next) {
    let quizes = await db.query('SELECT * FROM quizes');
    let data = quizes.rows;
    res.status(200).json({
        data: data
    });
})

module.exports = router;