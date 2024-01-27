var express = require('express');
var router = express.Router();

var db = require('../db');

router.get('/', async function(req, res) {
    let categories = await db.query('SELECT title, id, showOnHomePage, icon, pagelink FROM Categories');
    let data = categories.rows;
    res.json({
        data: data
    });
})

module.exports = router;