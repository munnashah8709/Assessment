const mongoose = require('mongoose');

// Define the schema for posts
const comment = new mongoose.Schema({
  Postid:String,
  userid:String,
  comments:String,
  

});

const Comments = mongoose.model('Comments', comment);
module.exports = Comments;
