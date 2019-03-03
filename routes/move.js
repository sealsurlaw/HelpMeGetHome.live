var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function (req, res, next) {
    db.any(`SELECT "backward", "left", "right", "forward" FROM controls;`)
        .then(data => {
            db.any(`UPDATE controls SET "left" = 0, "right" = 0, "forward" = 0, "backward" = 0, "moves" = "moves" + 1;`)
                .then(_ => {
                    res.send(data[0]);
                })
        })
        .catch(err => {
            console.log(err);
            res.send({
                left: null,
                right: null,
                forward: null,
                backward: null,
            })
        })
});

module.exports = router;