let mongoose = require("mongoose")

let UsersSchema = new mongoose.Schema({
  username: String,
  password: String,
  gender: String,
  membershipPoints: {type: Number, default: 0}
},
{ collection: "users" })

module.exports = mongoose.model("User", UsersSchema)