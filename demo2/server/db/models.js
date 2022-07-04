const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  userId: {
    type: String,
    index: true,
    unique: true
  }, 
  Name: {
    type: String
  },
  Email: {
    type: String
  },
  Title: {
    type: String
  }
})

const TaskSchema = new Schema({
  Task: {
    type: String
  },
  Priority: {
    type: Number
  },
  Description: {
    type: String
  },
  By_who: {
    type: String
  },
  Email: {
    type: String
  },
  Stage: {
    type: Number
  }
})

module.exports = {
  User: mongoose.model('User', UserSchema),
  Task: mongoose.model('Task', TaskSchema),
}
