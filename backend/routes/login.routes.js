var express = require('express');
var router = express.Router();

var db = require('../db');

router.get('/', async function(req, res) {
    let username = req.query.username;
    let password = req.query.password;
    let db_pass = await db.query('SELECT password FROM "user" WHERE "user".username = $1', [username]);
    if (db_pass.rows.length == 0 || password != db_pass.rows[0].password) {
        res.status(401);
    } else {
        let user_data = await db.query('SELECT username, id, email, token FROM "user" WHERE "user".username = $1', [username]);
        res.status(200).json({
            'data': user_data.rows[0]
        });
    }
})

module.exports = router;