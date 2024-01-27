var express = require('express');
var router = express.Router();

var db = require('../db');

router.post('/', async function(req, res, next) {
    let token = Math.random().toString(36);
    await db.query('INSERT INTO "user" (username, email, password, token) VALUES ($1, $2, $3, $4)', [req.body.username, req.body.email, req.body.password, token]);
    db.flush();
    res.status(200).json({
        
    })
})

module.exports = router;