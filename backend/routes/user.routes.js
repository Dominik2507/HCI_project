var express = require('express');
var router = express.Router();

var db = require('../db');

router.get('/', async function(req, res, next) {
    let id = parseInt(req.params.id);
    let item = await db.query('SELECT imageurl, inventory.name, inventory.price, colors, categories.name as catName, seasonal, description FROM categories, inventory WHERE inventory.id = $1 AND categories.id = inventory.categoryid', [id]);
    let data = item.rows;
    res.render('item', {
        title: data.name,
        linkActive: 'order',
        data: data
    })
})

module.exports = router;