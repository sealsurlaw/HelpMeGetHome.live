var express = require('express');
var router = express.Router();
var db = require('../db');
var names = require('../public/js/names.json');

router.get('/', function (req, res, next) {
    db.any(`SELECT * FROM controls;`)
        .then(data => {
            console.log(data);
            retData = data[0];
            retData.name = names[Math.floor(Math.random() * name.length())]
            console.log(retData);
            res.send(retData)
        })
        .catch(err => {
            console.log(err);
            res.send({
                moves: 0,
                left: 0,
                right: 0,
                forward: 0,
                backward: 0,
            })
        })
});

module.exports = router;