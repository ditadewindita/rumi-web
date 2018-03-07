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
      console.log("Attempting to create user...");

      User.findOne({ email: req.body.email }, function(err, user){
        // If user email already exists
        if (user) {
          res.status(401).json({ code : 1, message : 'Account with that email already exists.' });
        }
        else {
          User.findOne({ username : req.body.username }, function(err, user){
            // If username already exists
            if(user) {
              res.status(401).json({ code : 2, message : 'Account with that username already exists.' });
            }
            else {
              // Create user
              var newUser = new User(req.body);
              // Hash password
              newUser.password = bcrypt.hashSync(req.body.password, 10);

              // Save user
              newUser.save(function(err, user) {
                if(err) {
                  res.send(err);
                }
                else {
                  user.password = undefined;
                  return res.json(user);
                }
              });
            }
          });
        }
      });
    });

    app.post('/api/loginUser', function(req, res) {
      console.log("Attempting to login user...");

      User.findOne({ username : req.body.username }, function(err, user) {
        if(err)
          throw err;
        if(!user) {
          res.status(401).json({ code : 1, message : 'Authentication failed. User not found.'});
        }
        else if(user) {
          if(!user.comparePassword(req.body.password)) {
            res.status(401).json({ code : 2, message : 'Authentication failed. Password incorrect.'});
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
    app.get('/dashboard', function(req, res) {
      console.log(req.user);

      res.sendFile(path.resolve(__dirname, '../public') + '/views/dashboard/index.html')
    });

    app.get('/', function(req, res) {
        res.sendFile(path.resolve(__dirname, '../public') + '/index.html'); // load our public/index.html file
    });

    app.get('/login', function(req, res) {
        res.sendFile(path.resolve(__dirname, '../public') + '/index.html'); // load our public/index.html file
    });

    app.get('/register', function(req, res) {
        res.sendFile(path.resolve(__dirname, '../public') + '/index.html'); // load our public/index.html file
    });


};
