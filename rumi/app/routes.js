// grab the user model we just created
var User = require('./models/user');

    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        // sample api route
        app.post('/api/users', function(req, res) {
          console.log("Received from front-end: " + JSON.stringify(req.body));

          // use mongoose to create the user in the database
          User.create(req.body, function(err, user){
            if(err)
              res.send(err);
            else
              return res.json(user);
          });
        });

        // route to handle creating goes here (app.post)
        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });

    };
