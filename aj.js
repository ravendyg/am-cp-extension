// proxy for http://codebears.com/releases/deals.json

var express = require('express'),
    app = express();
var superagent = require(`superagent`);

app.set('port', 8080)

app.get('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get(`*`, function (req, webRes) {
    superagent
        .get(`http://codebears.com/releases/deals.json`)
        .end(function (err, res) {
            if (err) webRes.send(err);
            else {
                webRes.send(res);
            }
        })
});

// start server
app.listen(app.get('port'));
console.log('Listen on 8080');