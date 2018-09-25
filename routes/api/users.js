const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const passport = require('passport');

//Load User Model
const User = require('../../models/Users');
//@route GET api/Users/test
//@desc Tests Users route
//@access Public

router.get('/test', (req, res) => res.json({msg: "Users Works"}));

//@route GET api/Users/register
//@desc Register route
//@access Public

router.post('/register', (req,res) => {
  User.findOne({email: req.body.email})
    .then(user => {
      if(user) {
        return res.status(400).json({error: "User already exists"});
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200', //Size
          r: 'pg', //Rating
          d: 'mm' // Default
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });

      }
    });
});


//@route GET api/Users/login
//@desc Login User / Returning JWT Token
//@access Public
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email})
    .then(user => {
      //Check for user
      if(!user) {
        return res.status(404).json({email: "User not found"});
      }

      //Check to see if passwords match
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch) {
            //Create the jwt payload
           const payload = {
             id: user.id,
             name: user.name,
             avatar: user.avatar
           };

           //Sign Token
            jwt.sign(
              payload, 
              keys.secretOrKey,
              { expiresIn: 3600},
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              }
            );
          } else {
            return res.status(400).json({password: 'Password incorrect'});
          }
        });
    });
});


//@route  GET api/users/current
//@desc   Return current user
//@access Private

router.get('/current', passport.authenticate('jwt', {session:false}), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
} );


module.exports = router;