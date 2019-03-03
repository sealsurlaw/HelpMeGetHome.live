var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function (req, res, next) {
    const messageQuery = req.query.value;
    const nameQuery = req.query.name;

    if (direction.length == 0) {
        db.any(`SELECT * FROM controls;`)
            .then(data => {
                res.send(data[0]);
                return;
            })
    }

    db.any(`UPDATE controls SET "` + direction + `" = "` + direction + `" + 1; SELECT * FROM controls;`)
        .then(data => {
            console.log(data[0]);
            res.send(data[0]);
            return;
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
            return;
        })
});

module.exports = router;