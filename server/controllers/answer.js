const Model = require('../models/question');
// const userModel = require('../modules/user');

class Answer {
  static post (req,res) {
    let id = req.params.questionId;
    let answer = {
      description : req.body.description,
      userId : req.decoded._id
    }
    Model.findOneAndUpdate({ _id : id } , {
      $push : {
        answers : answer 
      }
    } , {
      new : true
    })
    .then(question => {
      if(!question) throw 'could not find question id.'
      res.status(200).json({
        message : 'posted answer to question! Added 5 points.',
        question
      })
    })
    .catch(error => {
      res.status(400).json({
        error
      })
    })
  }
  static update (req,res) {
    let aId = req.params.answerId;
    let qId = req.params.questionId;
    let userId = req.decoded._id;
    let fields = ['description','upvotes','downvotes'];
    Object.keys(req.body).forEach(field => fields.includes(field) ? null : delete req.body[field]);
    let update = req.body;
    Model.findOneAndUpdate( {_id : qId , "answers._id": aId , "answers.userId": userId } , {
      $set: {
        "answers.$": update
      }
    }, {
      new : true
    })
    .then(question => {
      res.status(200).json({
        message : 'updated answer.',
        question
      })
    })
    .catch(error => {
      res.status(400).json({
        error
      })
    })
  }
 
}

module.exports = Answer;