var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var User = require('./models/user');
var path = require('path');

module.exports = function(app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    // sample api route
    app.post('/api/createUser', function(req, res) {
      console.log("attempting to create user...");
      var newUser = new User(req.body);
      newUser.password = bcrypt.hashSync(req.body.password, 10);

      newUser.save(function(err, user) {
        if(err) {
          res.send(err);
        }
        else {
          user.password = undefined;
          return res.json(user);
        }
      });
    });

    app.post('/api/loginUser', function(req, res) {
      console.log("attempting to login user...");
      User.findOne({ username : req.body.username }, function(err, user) {
        if(err)
          throw err;
        if(!user) {
          res.status(401).json({ message : 'Authentication failed. User not found.'});
        }
        else if(user) {
          if(!user.comparePassword(req.body.password)) {
            res.status(401).json({ message : 'Authentication failed. Password incorrect.'});
          }
          else {
            return res.json({ token : jwt.sign({
              _id : user._id,
              firstName : user.firstName,
              lastName : user.lastName,
              email : user.email,
              username : user.username }, 'SUPERSECRETKEYOMG')});
          }
        }
      });
    });

    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('/', function(req, res) {
        res.sendFile(path.resolve(__dirname, '../public') + '/index.html');
    });

    app.get('/login', function(req, res) {
        res.sendFile(path.resolve(__dirname, '../public') + '/modules/login/views/main.html');
    });

    app.get('/register', function(req, res) {
        res.sendFile(path.resolve(__dirname, '../public') + '/modules/register/views/main.html');
    });

};
