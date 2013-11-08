module.exports = function(app) {
    var Game = require('../models/game.js');

    // GET: return all games in the DB
    findAllGames = function(req, res) {
        Game.find(function(err, games) {
            if (!err) {
                res.send(games);
            } else {
                console.log('Error: ' + err);
            }
        });
    };

    // GET: Return a Game with specified ID
    findById = function(req, res) {
        Game.findById(req.params.id, function(err, game) {
            if (!err) {
                res.send(game);
            } else {
                console.log('Error: ' + err);
            }
        });
    };

    // POST: Insert a new Game in the DB
    addGame = function(req, res) {
        console.log('POST');
        console.log(req.body);

        var game = new Game({
            name:     req.body.name,
            platform: req.body.platform
        });

        game.save(function(err) {
            if (!err) {
                console.log('Game created');
            } else {
                console.log('Error: ' + err);
            }
        });

        res.send(game);
    };

    // PUT: Update a register that already exists
    updateGame = function(req, res) {
        Game.findById(req.params.id, function(err, game) {
            game.name     = req.body.name;
            game.platform = req.body.platform;

            game.save(function(err) {
                if (!err) {
                    console.log('Game updated');
                } else {
                    console.log('Error: ' + err);
                }

                res.send(game);
            });
        });
    };

    // DELETE: Delete a game with specified ID
    deleteGame = function(req, res) {
        Game.findById(req.params.id, function(err, game) {
            game.remove(function(err) {
                if (!err) {
                    console.log('Game removed');
                    res.send({'status': 'Game removed'});
                } else {
                    console.log('Error: ' + err);
                }
            });
        });
    };

    // Link routes and functions
    app.get('/v0/games', findAllGames);
    app.get('/v0/games/:id', findById);
    app.post('/v0/game', addGame);
    app.put('/v0/game/:id', updateGame);
    app.delete('/v0/game/:id', deleteGame);
}
