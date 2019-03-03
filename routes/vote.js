var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function (req, res, next) {
    const directionQuery = req.query.direction;
    var direction;

    switch (directionQuery) {
        case 'left':
            direction = 'left';
            break;
        case 'right':
            direction = 'right';
            break;
        case 'forward':
            direction = 'forward';
            break;
        case 'left':
            direction = 'backward';
            break;
        default:
            direction = '';
            break;
    }

    db.any(`UPDATE controls SET "` + direction + `" = "` + direction + `" + 1, "moves" = "moves" + 1; SELECT * FROM controls;`)
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