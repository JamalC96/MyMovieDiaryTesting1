const chai = require("chai"),
    chaiHttp = require('chai-http');
const expect = chai.expect;
const request = require("supertest");
const _ = require("lodash");
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const Users = require("../../../models/users");
const mongoose = require("mongoose");


let server;
let mongod;
let db, validID;

chai.use(chaiHttp);

describe("Userss", () => {
    before(async () => {
        try {
            mongod = new MongoMemoryServer({
                instance: {
                    port: 27017,
                    dbPath: "./test/database",
                    dbName: "diariesdb" // by default generate random dbName
                }
            });
            // Async Trick - this ensures the database is created before
            // we try to connect to it or start the server
            await mongod.getConnectionString();

            mongoose.connect("mongodb://localhost:27017/diariesdb", {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            server = require("../../../bin/www");
            db = mongoose.connection;
        } catch (error) {
            console.log(error);
        }
    });

    after(async () => {
        try {
            await db.dropDatabase();
        } catch (error) {
            console.log(error);
        }
    });

    beforeEach(async () => {
        try {
            await Users.deleteMany({});
            let users = new Users();
            users.username = "AdamG1994";
            users.password = "Adam12345";
            users.gender = "M"
            users.membershipPoints = 200;
            await users.save();
            users = new Users();
            users.username = "RebeccaF96";
            users.passowrd = "Rebecca12345";
            users.gender = "F"
            users.membershipPoints = 2000;
            await users.save();
            users = await Users.findOne({
                gender: "F"
            });
            validID = users._id;
           
        } catch (error) {
            console.log(error);
        }
    });

    describe("GET /users", () => {
        it("should GET all the users entry", done => {
            request(server)
                .get("/diaries")
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200)
                .end((err, res) => {
                    try {
                        expect(res.body).to.be.a("array");
                        // expect(res.body.length).to.equal(2);
                        let result = _.map(res.body, users => {
                            return {
                                username: users.username,
                                gender: users.gender,
                            };
                        });
                        expect(result).to.deep.include({
                             username: 'AdamG1994', gender: 'M' }
                        );

                        expect(result).to.deep.include({
                            username: "RebeccaF96",
                            gender: "F"
                        });
                        done();
                    } catch (e) {
                        done(e);
                    }
                });
        });


    });

});

