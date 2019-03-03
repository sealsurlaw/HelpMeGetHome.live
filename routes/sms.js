var express = require('express');
var router = express.Router();
var accountSid = 'AC20000fc501ef3991d171e0dbbe8fd1df'; // Your Account SID from www.twilio.com/console
var authToken = '877dd76a608187d7d6526748c1c0e464';   // Your Auth Token from www.twilio.com/console
var twilio = require('twilio');
var client = new twilio(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

router.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();

    if (req.body.Body.toUpperCase() == 'FORWARD') {
        twiml.message('Fo!');
    } else if (req.body.Body == 'RIGHT') {
        twiml.message('Goodbye');
    }
    else if (req.body.Body.toUpperCase() == 'DOWN') {
        twiml.message('Goodbye');
    }
    else if (req.body.Body.toUpperCase() == 'LEFT') {
        twiml.message('Goodbye');
    }

    res.writeHead(200, { 'Content-Type': 'text/json' });
    res.end(twiml.toString());
});

module.exports = router;
