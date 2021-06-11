const { request } = require('express');
const express = require('express');
const app = express();

//Settings 
app.set('port', process.env.PORT || 3000);

//Middleware

//Routes

//Static files
app.get('/', (req, res) => {
    res.sentFile(__dirname + '/public/index.html');
});

app.post('/submit', (req, res) => {
    if(req.body.captcha === undefined || req.body.captcha === '' || req.body.captcha === null){
        return res.json({"success": false, "msg": "F"});
    }

    //Secret key
    const secretKey = '6LeCQigbAAAAANZ6FRIFxQXgENCiEGEZ9jYHmqML';

    //Verify URL
    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response${req.body.captcha}&remoteip=${req.socket.remoteAddress}`;

    //Make request to verifyURL

    request(verifyUrl, (err, response, body) => {
        body = JSON.parse(body);

        //If not succesful
        if(body.success !== undefined && !body.success){
            return res.json({"success": false, "msg": "Failed captcha"});
        }

        //If succesful
        res.json({"success": true, "msg": "You won some coins"});
    })
});

//Server is listening

app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});