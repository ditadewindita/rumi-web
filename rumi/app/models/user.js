// grab the mongoose module
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName : {type : String, default: ''},
    lastName : {type : String, default: ''},
    email : {type : String, default: ''},
    username : {type : String, default: ''},
    password : {type : String, default: ''},
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, bcrypt.hashSync(this.password, 10));
};

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('User', UserSchema);
