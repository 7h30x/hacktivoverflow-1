const Model = require('../models/user');
const jwt = require('jsonwebtoken');


module.exports = class User {
  static signUp (req,res) {
    let newUser ={
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    } 
    Model.findOne({email: newUser.email})
    .then(user => {
      if(user) {
        throw 'email is already registered.'
      } else {
        return Model.create(newUser)
      }
    })
    .then(response => {
      let user = response;
      delete user.password;
      let token = jwt.sign(response.toObject(), process.env.JWT_SECRET);
      res.status(200).json({
        message:'successfully created new user',
        token,
        user
      })
    })
    .catch(error => {
      console.log(error)
      res.status(400).json({
        message: error
      })
    })
  }
  static signIn (req,res) {
    let userData;
    let loginData ={
      email: req.body.email,
      password: req.body.password
    } 
    Model.findOne({email: loginData.email})
    .populate('cart.items.item')
    .then(user => {
      if(user) {
        userData = user.toObject();
        delete userData.password;
        return user.comparePassword(loginData.password);
      } else throw 'email not registered.';
    })
    .then(same => {
      if(same) {
        //create JWT
        let token = jwt.sign(userData, process.env.JWT_SECRET);
        res.status(200).json({
          message: 'successfully signed in user.',
          token,
          watchedTags : userData.watched_tags,
          user: {
            name : userData.firstName + ' ' + userData.lastName,
            userId: userData._id
          }
        })
      } else throw 'wrong password.'
    })
    .catch(error => {
      // console.log(error)
      res.status(400).json({
        error: String('could not sign in user.')
      })
    })
  }

  static findAll (req,res) {
    Model.find()
    .then(data => {
      res.status(200).json({
        message:'successfully retrieved users',
        data
      })
    })
    .catch(error => {
      res.status(400).json({
        message: error
      })
    })
  }
  static updateWatched (req,res) {
    let id = req.decoded._id;
    let newTags = req.body.newTags;
    Model.findOneAndUpdate({_id : id }, {
      $push: {
        watched_tags : newTags
      }
    } , {
      new : true
    })
    .then(data => {
      delete data.password;
      if(!data) throw 'user id not found'
      res.status(200).json({
        message:'successfully updated user tags',
        watchedTags : data.watched_tags
      })
    })
    .catch(error => {
      res.status(400).json({
        message: error
      })
    })
  }
}