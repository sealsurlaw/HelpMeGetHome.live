var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function (req, res, next) {
    const ip = req.query.ip;

    db.any(`UPDATE controls SET "ip" = "` + ip + `";`)
        .then(_ => { })
        .catch(err => {
            console.log(err);
        })
});

module.exports = router;