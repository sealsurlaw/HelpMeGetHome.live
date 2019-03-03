var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function (req, res, next) {
    const direction = req.query.direction;

    db.any(`UPDATE controls SET ` + direction + ` = ` + direction + ` + 1;`)
        .then(data => {
            console.log(data[0]);
            res.send(data[0]);
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