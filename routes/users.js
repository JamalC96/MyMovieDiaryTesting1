let express = require("express")
let router = express.Router()
let users = require("../models/users")
let mongoose = require("mongoose")
let User = require("../models/users")

let mongodbUri = "mongodb+srv://Jamal_96:cunningham96@wit-webapp-cluster-iwlzg.mongodb.net/myjournaldb?retryWrites=true&w=majority"

mongoose.connect(mongodbUri)



/* GET users listing. */
router.get("/", function(req, res) {
  res.send("respond with a resource")
})

router.findAllUsers = (req, res) => {
  // Return a JSON representation of our list
  res.setHeader("Content-Type", "application/json")

  User.find(function(err, users) {
    if (err)
      res.send(err)
    else
      res.send(JSON.stringify(users,null,5))
  })
}

router.findOneID = (req, res) => {

  res.setHeader("Content-Type", "application/json")

  User.find({ "_id" : req.params.id },function(err, user) {
    if (err)
      res.json({ message: "User NOT Found!!!", errmsg : err } )

    else
      res.send(JSON.stringify(user,null,5))
  })
}

router.findUsername = (req, res) => {

  res.setHeader("Content-Type", "application/json")

  User.find({ "username" : req.params.username },function(err, user) {
    if (err)
      res.json({ message: "UserName NOT Found!!!", errmsg : err } )

    else
      res.send(JSON.stringify(user,null,5))
  })
}



router.addUser = (req, res) => {

  res.setHeader("Content-Type", "application/json")

  let user = new User()

  user.username = req.body.username
  user.password = req.body.password

  user.save(function(err) {
    if (err)
      res.json({ message: "User NOT Added!", errmsg : err } )
    else
      res.json({ message: "User Successfully Added!", data: user })
  })
}



router.deleteUser = (req, res) => {

  User.findByIdAndRemove(req.params.id, function(err) {
    if (err)
      res.json({ message: "User NOT Deleted!", errmsg : err } )
    else
      res.json({ message: "User was Successfully Deleted!"})
  })
}

router.deleteUsername = (req, res) => {

  User.findByIdAndRemove(req.params.username, function(err) {
    if (err)
      res.json({ message: "UserName was NOT DELETED!", errmsg : err } )
    else
      res.json({ message: "UserName was Successfully Deleted!"})
  })
}



router.incrementPoints = (req, res) => {
  // Find the relevant donation based on params id passed in
  // Add 1 to upvotes property of the selected donation based on its id
  let user = getByValue(users,req.params.id)

  if (user != null) {
    user.memberPoints += 100
    res.json({status : 200, message : "20+ Points Added Successfully" , user : user })
  }
  else
    res.send("User NOT Found - Points NOT added Successfully!!")
}

router.incrementPoints = (req, res) => {

  User.findById(req.params.id, function(err,user) {
    if (err)
      res.json({ message: "Donation NOT Found!", errmsg : err } )
    else {
      user.upvotes += 1
      user.save(function (err) {
        if (err)
          res.json({ message: "Diary Entry NOT UpVoted!", errmsg : err } )
        else
          res.json({ message: "Diary Entry Successfully Upvoted!", data: users })
      })
    }
  })
}

function getByValue(array, id) {
  let result  = array.filter(function(obj){return obj.userid == id} )
  return result ? result[0] : null // or undefined
}



module.exports = router


