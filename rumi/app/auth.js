var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

// Models
var User = require('./models/user');

var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var path = require('path');

// Configurations
var config = require('./config');
var tokenKey = config.secretKey;

var verifyToken = require('./verify');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Routes
router.post('/register', function(req, res) {

  User.findOne({ email : req.body.email }, function(err, user){
    // If user email already exists
    if (user) {
      res.status(401).send({ code : 1, message : 'Account with that email already exists.' });
    }
    else {
      User.findOne({ username : req.body.username }, function(err, user){
        // If username already exists
        if(user) {
          res.status(401).send({ code : 2, message : 'Account with that username already exists.' });
        }
        else {
          // Create user
          var newUser = new User(req.body);
          // Hash password
          newUser.password = bcrypt.hashSync(req.body.password, 10);

          // Save user
          newUser.save(function(err, user) {
            if(err) {
              res.status(500).send(err);
            }
            else {
              user.password = undefined;
              var token = jwt.sign({ id : user._id }, tokenKey);
              return res.status(200).send({ auth : true, token : token });
            }
          });
        }
      });
    }
  });
});

router.get('/me', verifyToken, function(req, res, next) {

    User.findById(req.userId, { password : 0 }, function (err, user) {
      if (err)
        return res.status(500).send("There was a problem finding the user.");
      if (!user)
        return res.status(404).send("No user found.");

      res.status(200).send(user);
    });

});



router.post('/login', function(req, res) {

  User.findOne({ username : req.body.username }, function(err, user) {
    if(err)
      return res.status(500).send('Error on the server.');
    if(!user)
      return res.status(404).send({ code : 1, message : 'Authentication failed. User not found.'});
    else if(user) {
      if(!user.comparePassword(req.body.password))
        return res.status(401).send({ auth : false, token : null, code : 2, message : 'Authentication failed. Password incorrect.'});

      var token = jwt.sign({ id : user._id }, tokenKey);
      res.status(200).send({ auth : true, token : token });
    }
  });
});

router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

module.exports = router;
