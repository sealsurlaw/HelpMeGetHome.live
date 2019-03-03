var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function (req, res, next) {
    db.any(`SELECT * FROM controls;`)
        .then(data => {
            // console.log(data);
            res.send(data[0])
        })
        .catch(err => {
            console.log(err);
            res.send({
                backward: 0,
                moves: 0,
                left: 0,
                right: 0,
                forward: 0,
            })
        })
});

module.exports = router;