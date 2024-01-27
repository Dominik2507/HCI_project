var express = require('express');
var router = express.Router();

var db = require('../db');

router.post('/', async function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    let db_pass = await db.query('SELECT password FROM user WHERE username = $1', [username]);
    if (password != db_pass) {
        res.status(401);
    } else {
        let user_data = await db.query('SELECT username, id, email, token FROM user WHERE username = $1', [username]);
        res.status(200).json({
            'data': user_data.rows
        });
    }
})

module.exports = router;