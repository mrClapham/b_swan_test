var express = require('express')
    , http = require('http')
    , path = require('path')
    , cors = require("cors"); // Cross Origin Access Sharing, just in case ;


var app = express();

app.set('title','Git Search');

app.use(express.static(path.join(__dirname, 'app')));

/* serves main page */
app.get("/fl", function(req, res) {
    res.sendFile('app/intro.html');
});

app.use("/", express.static(__dirname + 'app/index.html'));


var port = process.env.PORT || 5005;

http.createServer(app).listen(port, function(){
    console.log('Express server listening on port ' + port);
});
