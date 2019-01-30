const Model = require('../models/question');

class Question {
  static findAll (req,res) {
    Model.find()
    .then(questions => {
      res.status(200).json({
        message: "retrieved all questions.",
        questions
      })
    })
    .catch(error => {
      res.status(400).json({
        message:"could not retrieve questions.",
        error
      })
    })
  }
  static findOne (req,res) {
    let id = req.params.questionId;
    Model.findOne({_id : id})
    .populate('answers')
    .then(question => {
      if(!question) throw 'no question was found.'
      res.status(200).json({
        message: "retrieved question.",
        question
      })
    })
    .catch(error => {
      res.status(400).json({
        message:"could not retrieve question.",
        error
      })
    })
  }
  static post (req,res) {
    let data = {
      title: req.body.title,
      description: req.body.description,
      userId: req.decoded._id,
      tags: req.body.tags
    }
    Model.create(data)
    .then(question => {
      res.status(200).json({
        message: "created question.",
        question
      })
    })
    .catch(error => {
      // console.log(error)
      res.status(400).json({
        message:"could not retrieve question.",
        error
      })
    })
  }
  static update (req,res) {
    let id = req.params.questionId;
    let currentUser = req.decoded._id;
    let fields = ['title','description','upvotes','downvotes','tags'];
    Object.keys(req.body).forEach(field => fields.includes(field) ? null : delete req.body[field]);
    
    //find by questionId and userId == currentUser
    Model.findOneAndUpdate({ _id : id , userId : currentUser} , {$set: req.body}, {new: true})
    .then(question => {
      res.status(200).json({
        message: "updated question.",
        question
      })
    })
    .catch(error => {
      res.status(400).json({
        message:"could not delete question.",
        error
      })
    })
  }
  static delete (req,res) {
    let id = req.params.questionId;
    Model.findOneAndDelete({_id : id})
    .then(question => {
      res.status(200).json({
        message: "deleted question.",
        question
      })
    })
    .catch(error => {
      res.status(400).json({
        message:"could not delete question.",
        error
      })
    })
  }
}

module.exports = Question;