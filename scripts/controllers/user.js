var jwt = require('jsonwebtoken');
var User = require('../models/user.js');
var _ = require('underscore');

exports.search = function(query, callback){

  console.log(query);
  //User.find({ $text: { $search: }})
}

exports.find = function(query, callback){
  console.log(query);
  User.find(query, 'username type', function(err, users){
    if(err){
      callback(err, null); //(error, payload)  -- error means no payload so payload param is empty
      return;
    }

    callback(null, users);
  })
};

exports.findById = function(id, callback){
  User.findById(id, function(err, user){
    if(err){
      callback(err, null);
      return;
    }

    callback(null, user);
  })
}

exports.create = function(body, callback) {
  var newUser = new User({
    username: body.username,
    password: body.password,
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    phone: body.phone,
    admin: body.admin
  });

  User.createUser(newUser, function(err, user){
    if(err){
      callback(err, null); //(error, payload)  -- error means no payload so payload param is empty
      return;
    }

    callback(null, user);
  });
};

exports.login = function(req, res, next){
  User.getLoginByUsername(req.body.username, function(err, user){
   if(err) throw err;
   if(!user){
     res.send({message: 'Unknown User'});
     return;
   }
   User.comparePassword(req.body.password, user.password, function(err, isMatch){
     if(err) throw err;
     if(isMatch){
       var u = {
         name: user.username,
         _id: user._id
       };
       var token = jwt.sign(u, 'this is my secret and nobody elses', {
         expiresIn: 60 * 60 * 24 // expires in 24 hours
       });
       res.send({
         token: token,
         user: u
       });
     } else {
       res.send({message: 'Invalid password'});
     }
   });
  });
}

exports.delete = function(id, callback){
  User.findByIdAndRemove(id, function deleteUser(err) {
    if (err){
      callback(err, null); //(error, payload)  -- error means no payload so payload param is empty
      return;
    }

    callback(null);
  });
}
