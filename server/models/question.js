const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const answerSchema = new Schema ({
  description: {
    type: String,
    required : true
  },
  upvotes: {
    type: Number,
    default: 0
  },
  downvotes: {
    type: Number,
    default : 0
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
} , {
  timestamps : true
})
const questionSchema = new Schema ({
  title : {
    type: String,
    required :true
  }, 
  description: {
    type: String,
    required :true
  },
  upvotes: {
    type: Number,
    default: 0
  },
  downvotes: {
    type: Number,
    default : 0
  },
  tags: [String],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  answers: [answerSchema],
  
} , {
  timestamps : true
})

module.exports = mongoose.model('question', questionSchema);