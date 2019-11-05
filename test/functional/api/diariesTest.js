const chai = require("chai"),
  chaiHttp = require("chai-http")
const expect = chai.expect
const request = require("supertest")
const _ = require("lodash")
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer
const Diary = require("../../../models/diaries")
const Users = require("../../../models/users")
const mongoose = require("mongoose")


let server
let mongod
let db, validID, typeMov, genre,userNameID

chai.use(chaiHttp)


describe("Diariess", () => {
  before(async () => {
    try {
      mongod = new MongoMemoryServer({
        instance: {
          port: 27017,
          dbPath: "./test/database",
          dbName: "diariesdb" // by default generate random dbName
        }
      })
      // Async Trick - this ensures the database is created before
      // we try to connect to it or start the server
      await mongod.getConnectionString()

      mongoose.connect("mongodb://localhost:27017/diariesdb", {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      server = require("../../../bin/www")
      db = mongoose.connection
    } catch (error) {
      console.log(error)
    }
  })

  after(async () => {
    try {
      await db.dropDatabase()
    } catch (error) {
      console.log(error)
    }
  })

  beforeEach(async () => {
    try {
      await Diary.deleteMany({})
      let diary = new Diary()
      diary.type = "Series"
      diary.genre = "Fiction"
      diary.favorite = "Game Of Thrones"
      diary.stars = "8.5"
      diary.comments = "Amazing show well worth the watch"
      diary.upvotes = 2
      await diary.save()
      diary = new Diary()
      diary.type = "Movie"
      diary.genre = "Action"
      diary.favorite = "Bad Boys 3"
      diary.stars = "6.0"
      diary.comments = "One of Will Smith best movie"
      diary.upvotes = 2
      await diary.save()
      diary = await Diary.findOne({
        genre: "Action"
      })
      validID = diary._id
      typeMov = diary.type
      genre = diary.genre
    } catch (error) {
      console.log(error)
    }
  })

  describe("GET /diaries", () => {
    it("should GET all the diarys entry", done => {
      request(server)
        .get("/diaries")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          try {
            expect(res.body).to.be.a("array")
            // expect(res.body.length).to.equal(2);
            let result = _.map(res.body, diary => {
              return {
                type: diary.type,
                genre: diary.genre,
              }
            })
            expect(result).to.deep.include({
              type: "Series",
              genre: "Fiction",
            })

            expect(result).to.deep.include({
              type: "Movie",
              genre: "Action"
            })
            done()
          } catch (e) {
            done(e)
          }
        })
    })

    
        



    describe("GET /diaries/:id", () => {
      describe("when the id is valid", () => {
        it("should return the matching diary", done => {
          request(server)
            .get(`/diaries/${validID}`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
              expect(res.body[0]).to.have.property("genre", "Action")
              expect(res.body[0]).to.have.property("favorite", "Bad Boys 3")
              done(err)
            })
        })
      })
      describe("when the id is invalid", () => {
        it("should return the NOT found message", done => {
          request(server)
            .get("/diaries/9999")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
              expect(res.body.message).equals("Diary Entry NOT Found!!!")
              done(err)
            })
        })
      })
    })

        

    describe("GET /diaries/type/:type", () => {
      describe("when the id is valid", () => {
        it("should return the matching diary", done => {
          request(server)
            .get(`/diaries/type/${typeMov}`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
              expect(res.body[0]).to.have.property("type", "Movie")
              expect(res.body[0]).to.have.property("genre", "Action")
              done(err)
            })
        })
      })
      describe("when the type is invalid", () => {
        it("should return the NOT found message", done => {
          request(server)
            .get("/diaries/Series")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
              expect(res.body.message).equals("Diary Entry NOT Found!!!")
              done(err)
            })
        })
      })
    })

    describe("GET /diaries/genre/:genre", () => {
      describe("when the genre is valid", () => {
        it("should return the matching diary", done => {
          request(server)
            .get(`/diaries/genre/${genre}`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
              expect(res.body[0]).to.have.property("genre", "Action")
              expect(res.body[0]).to.have.property("favorite", "Bad Boys 3")
              done(err)
            })
        })
      })
      describe("when the type is invalid", () => {
        it("should return the NOT found message", done => {
          request(server)
            .get("/diaries/Comedy")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
              expect(res.body.message).equals("Diary Entry NOT Found!!!")
              done(err)
            })
        })
      })
    })


  })


  describe("PUT /diaries/:id/vote", () => {
    describe("when the id is valid", () => {
      it("should return a message and the donation upvoted by 1", () => {
        return request(server)
          .put(`/diaries/${validID}/votes`)
          .expect(404)
          .then(resp => {
            expect(resp.body.data).to.have.include({
              message: "Diary Upvoted!"
            })
            expect(resp.body.data).to.have.property("upvotes", 2)
          })
      })
      after(() => {
        return request(server)
          .get(`/diaries/${validID}`)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then(resp => {
            expect(resp.body[0]).to.have.property("upvotes", 2)
          })
      })
    })
    describe("when the id is invalid", () => {
      it("should return a 404 and a message for invalid diary id", () => {
        return request(server)
          .put("/donations/1100001/vote")
          .expect(404)
      })
    })
  })

  describe("DELETE /diaries/:id", function () {
    describe("when id is valid", function () {
      it("should return a confirmation message and the deleted diary", function (done) {
        chai.request(server)
          .delete("/diaries/1000001")
          .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.have.property("message", "Diary NOT Deleted!")
            done()
          })

      })
      after(function (done) {
        chai.request(server)
          .get("/diaries")
          .end(function (err, res) {
            expect(res).to.have.status(200)
            expect(res.body).be.be.a("array")
            let result = _.map(res.body, function (diary) {
              return {
                type: diary.type,
                genre: diary.genre
              }
            })
            expect(result).to.not.include({
              type: "Movie",
              genre: "Action"
            })
            done()
          })
      })

    })

    describe("when id is invalid", function () {
      it("should return an error message", function(done) {
        chai.request(server)
          .delete("/diaries/1000002")
          .end( (err, res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.have.property("message","Diary NOT Deleted!" ) 
            done()
          })
      })
    })




  })

  describe("DELETE /diaries/genre/:genre", function () {
    describe("when genre is valid", function () {
      it("should return a confirmation message and the deleted diary", function (done) {
        chai.request(server)
          .delete("/diaries/genre/1000001")
          .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.have.property("message", "Diary NOT Deleted!")
            done()
          })

      })
      after(function (done) {
        chai.request(server)
          .get("/diaries")
          .end(function (err, res) {
            expect(res).to.have.status(200)
            expect(res.body).be.be.a("array")
            let result = _.map(res.body, function (diary) {
              return {
                genre: diary.genre
              }
            })
            expect(result).to.not.include({
              genre: "Action"
            })
            done()
          })
      })

    })

    describe("when genre is invalid", function () {
      it("should return an error message", function(done) {
        chai.request(server)
          .delete("/diaries/genre/1000002")
          .end( (err, res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.have.property("message","Diary NOT Deleted!" ) 
            done()
          })
      })
    })

  })

})

describe("Userss", () => {
  before(async () => {
    try {
      mongod = new MongoMemoryServer({
        instance: {
          port: 27017,
          dbPath: "./test/database",
          dbName: "diariesdb" // by default generate random dbName
        }
      })
      // Async Trick - this ensures the database is created before
      // we try to connect to it or start the server
      await mongod.getConnectionString()

      mongoose.connect("mongodb://localhost:27017/diariesdb", {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      server = require("../../../bin/www")
      db = mongoose.connection
    } catch (error) {
      console.log(error)
    }
  })

  after(async () => {
    try {
      await db.dropDatabase()
    } catch (error) {
      console.log(error)
    }
  })

  beforeEach(async () => {
    try {
      await Users.deleteMany({})
      let users = new Users()
      users.username = "AdamG1994"
      users.password = "Adam12345"
      users.gender = "M"
      users.membershipPoints = 200
      await users.save()
      users = new Users()
      users.username = "RebeccaF96"
      users.passowrd = "Rebecca12345"
      users.gender = "F"
      users.membershipPoints = 2000
      await users.save()
      users = await Users.findOne({
        gender: "F"
      })
      validID = users._id
      userNameID = users.username

           
    } catch (error) {
      console.log(error)
    }
  })

  describe("GET /users", () => {
    it("should GET all the users entry", done => {
      request(server)
        .get("/users")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          try {
            expect(res.body).to.be.a("array")
            // expect(res.body.length).to.equal(2);
            let result = _.map(res.body, users => {
              return {
                username: users.username,
                gender: users.gender,
              }
            })
            expect(result).to.deep.include({
              username: "RebeccaF96",
              gender: "F"
            })
            done()
          } catch (e) {
            done(e)
          }
           
        })
    })


  })

  describe("GET /users/:id", () => {
    describe("when the id is valid", () => {
      it("should return the matching user", done => {
        request(server)
          .get(`/users/${validID}`)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.body[0]).to.have.property("gender", "F")
            done(err)
          })
      })
    })

  })

  describe("when the id is invalid", () => {
    it("should return the NOT found message", done => {
      request(server)
        .get("/users/9999")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).equals("User NOT Found!!!")
          done(err)
        })
    })
  })

  describe("GET /users/username/:username", () => {
    describe("when the username is valid", () => {
      it("should return the matching user", done => {
        request(server)
          .get(`/users/username/${userNameID}`)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.body[0]).to.have.property("username", "RebeccaF96")
            done(err)
          })
      })
    })

  })

  describe("when the username is invalid", () => {
    it("should return the NOT found message", done => {
      request(server)
        .get("/users/9999")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).equals("User NOT Found!!!")
          done(err)
        })
    })
  })

  describe("PUT /users/:id/vote", () => {
    describe("when the id is valid", () => {
      it("should return a message and the user membershipPoints upvoted by 2000", () => {
        return request(server)
          .put(`/users/${validID}/votes`)
          .expect(404)
          .then(resp => {
            expect(resp.body.data).to.have.include({
              message: "User Upvoted!"
            })
            expect(resp.body.data).to.have.property("membershipPoints", 2000)
          })
      })
      after(() => {
        return request(server)
          .get(`/users/${validID}`)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then(resp => {
            expect(resp.body[0]).to.have.property("membershipPoints", 2000)
          })
      })
    })
    describe("when the id is invalid", () => {
      it("should return a 404 and a message for invalid user id", () => {
        return request(server)
          .put("/users/1100001/vote")
          .expect(200)
      })
    })
  })

    
  describe("DELETE /users/:id", function () {
    describe("when id is valid", function () {
      it("should return a confirmation message and the deleted user", function (done) {
        chai.request(server)
          .delete("/users/1000001")
          .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.have.property("message", "User NOT Deleted!")
            done()
          })

      })
      after(function (done) {
        chai.request(server)
          .get("/users")
          .end(function (err, res) {
            expect(res).to.have.status(200)
            expect(res.body).be.be.a("array")
            let result = _.map(res.body, function (users) {
              return {
                username: users.username,
                gender: users.gender
              }
            })
            expect(result).to.not.include({
              username: "RebeccaF96",
              gender: "F"
            })
            done()
          })
      })

    })

    describe("when id is invalid", function () {
      it("should return an error message", function(done) {
        chai.request(server)
          .delete("/users/1000002")
          .end( (err, res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.have.property("message","User NOT Deleted!" ) 
            done()
          })
      })
    })




  })

  describe("DELETE /users/users/:username", function () {
    describe("when username is valid", function () {
      it("should return a confirmation message and the deleted username", function (done) {
        chai.request(server)
          .delete("/users/users/1000001")
          .end((err, res) => {
            expect(res).to.have.status(500)
            // expect(res.body).to.have.property('message', 'UserName NOT Deleted!');
            done()
          })

      })
      after(function (done) {
        chai.request(server)
          .get("/users")
          .end(function (err, res) {
            expect(res).to.have.status(200)
            expect(res.body).be.be.a("array")
            let result = _.map(res.body, function (users) {
              return {
                username: users.username
              }
            })
            expect(result).to.not.include({
              username: "RebeccaF96"
            })
            done()
          })
      })

    })

    describe("when user is invalid", function () {
      it("should return an error message", function(done) {
        chai.request(server)
          .delete("/users/1000002")
          .end( (err, res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.have.property("message","User NOT Deleted!" ) 
            done()
          })
      })
    })

  })

})


