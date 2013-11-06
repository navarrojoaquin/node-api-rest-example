var express  = require("express"),
    app      = express(),
    http     = require("http"),
    server   = http.createServer(app),
    mongoose = require("mongoose");

app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
});

app.get('/', function(req, res) {
    res.send("Hello world!");
});

routes = require("./routes/games")(app)

mongoose.connect('mongodb://localhost/gametest', function(err, res) {
    if (err) {
        console.log('Error connecting to DB: ' + err);
    } else {
        console.log('Connected to DB');
    }
});

server.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
});

