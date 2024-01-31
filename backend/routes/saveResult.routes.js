var express = require('express');
var router = express.Router();

var db = require('../db');

router.post('/', async function(req, res, next) {
    let token = req.body.token;
    let user_info = await db.query('SELECT id FROM "user" WHERE token = $1', [token]);
    user_id = user_info.rows[0].id;

    let curr_results = await db.query('SELECT * FROM result WHERE userid = $1', [user_id]);

    if (curr_results.rows.length == 0) {
        await db.query('INSERT INTO result (solvedquestion, timespentsolving, userid) VALUES ($1, $2, $3)', [req.body.solvedquestions, req.body.timespent, user_id]);
    } else {
        await db.query('UPDATE result SET solvedquestion = $1, timespentsolving = $2', [curr_results.rows[0].solvedquestion + req.body.solvedquestions, curr_results.rows[0].timespentsolving + req.body.timespent]);
    }

    res.status(200)
})

module.exports = router;