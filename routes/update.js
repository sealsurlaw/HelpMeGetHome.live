var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function (req, res, next) {
    db.any(`SELECT * FROM controls;`)
        .then(data => {
            console.log(data);
            res.send({
                time: 5,
                left: 12,
                right: 44,
                forward: 67,
                backward: 1,
            })
        })
        .catch(err => {
            console.log(err);
            res.send({
                time: null,
                left: null,
                right: null,
                forward: null,
                backward: null,
            })
        })
});

module.exports = router;