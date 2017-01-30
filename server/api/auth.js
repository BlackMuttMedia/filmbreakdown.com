var UserDetail = require('./models/UserDetail');
var mongoose = require('mongoose');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
import React from "react";  
import { Router } from 'express'
import _ from 'lodash'

const router = new Router()

var isProduction = process.env.NODE_ENV === 'production';

var secret = isProduction ? 
  'jdkalhafjhagdhfadbv.cbblajhoeoregabflVfhdvBhfjalhdjaghoducchlbqrefDhlbjafhdglaL' : 
  'hfdjvhoaihejidbvjbpreja;bnajbvdzbdbvpjaovhb.bk;ZCvkjblvhjalhjbkrjajbvjkBLVbjvbzbcvhjbajkglba';

router.get('/users', (req, res) => {
	let UserDetails = mongoose.model('userInfo', UserDetail)
	UserDetails.findOne({}, (err, users) => {
    if(err) {
      res.json({ 'success' : false, 'error' : err });
    }
    else
    {
      res.json({ 'success' : true, 'exists' : true, 'error' : undefined, 'users' : users });
		}
	})
})

router.get('/test', (req, res) => { res.status(200).json({ test: true })})

router.post('/login',(req, res) => {
		var UserDetails = mongoose.model('userInfo', UserDetail);
		var username = req.body.username;
		var password = req.body.password;

		UserDetails.findOne({
		  'username_lower' : username.toLowerCase()
		}, function(err, user) {
		  if(err)
		  {
		    res.json({ 'success' : false, 'error' : err });
		  }
		  else if(!user)
		  {
		    res.json({ 'success' : false, 'exists' : false, 'error' : 'User does not exist', original: req.body });
		  }
		  else
		  {
		    user.comparePassword(password, function(passErr, isMatch) {
		      if(err) {
		        res.json({ 'success' : false, 'error' : err });
		      }
		      else
		      {
		        var error;
		        var token
		        if(!isMatch) {
		          error = 'Password is incorrect';
		        }
		        else {
		          // We are sending the profile inside the token
		          token = jwt.sign(user, secret, { expiresIn: 60*60*5 });
		        }
		        res.json({ 'success' : isMatch, 'exists' : true, 'error' : error, 'user' : user, 'token' : token });
		      }
		    });
		  }
	});
})

router.post('/signup', (req, res) => {
    var userDetail = mongoose.model('userInfo', UserDetail);
    var newUser = new userDetail({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      confirm: req.body.confirm
    });

    // save user to database
    newUser.save(function(err) {
      if (err) {
        res.json({ 'success' : false, 'error' : err });
      }
      else {
        var token = jwt.sign(newUser, secret, { expiresInMinutes: 60*5 });
        res.json({ 'success' : true, 'exists' : true, 'error' : undefined, 'user' : newUser, 'token' : token });
      }
    });
  })

module.exports = router
