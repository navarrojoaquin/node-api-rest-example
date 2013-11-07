var express  = require("express"),
    app      = express(),
    https    = require("https"),
    fs       = require("fs"),
    mongoose = require("mongoose");

app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
});

app.get('/', function(req, res) {
    res.send("Hello world!");
});

routes = require("./routes/games")(app);

mongoose.connect('mongodb://localhost/gametest', function(err, res) {
    if (err) {
        console.log('Error connecting to DB: ' + err);
    } else {
        console.log('Connected to DB');
    }
});

var options = {
  key: fs.readFileSync('fixtures/keys/key.pem'),
  cert: fs.readFileSync('fixtures/keys/cert.pem')
};

https.createServer(options, app).listen(3000);

