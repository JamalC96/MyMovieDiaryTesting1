

let mongoose = require("mongoose")

let DiarySchema = new mongoose.Schema({
  type: String,
  genre: String,
  favorite: String,
  stars: String,
  comments: String,
  upvotes: {type: Number, default: 0}
},
{ collection: "journals" })

module.exports = mongoose.model("Journal", DiarySchema)





