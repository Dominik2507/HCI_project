var express = require('express');
var router = express.Router();

var db = require('../db');

router.post('/', async function(req, res, next) {
    let token = db.query('SELECT id FROM "user" WHERE $1 = token', [req.body.authorToken])
    await db.query('INSERT INTO quizes (title, duration, image, categoryid, quiztypeid, authorid) VALUES ($1, $2, $3, $4, $5, $6)', [req.body.name, req.body.duration, req.body.image, req.body.category, req.body.quizType, author]);
    res.status(200).json({
        data: token
    })
})

module.exports = router;