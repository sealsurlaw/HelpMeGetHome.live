var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function (req, res, next) {
    db.any(`SELECT * FROM controls;`)
        .then(data => {
            console.log(data);
            res.send(data[0])
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