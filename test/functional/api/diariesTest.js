const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const _ = require("lodash");
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const Diary = require("../../../models/diaries");
const mongoose = require("mongoose");


let server;
let mongod;
let db, validID;

describe("Diariess", () => {
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
            await Diary.deleteMany({});
            let diary = new Diary();
            diary.type = "Series";
            diary.genre = "Fiction";
            diary.favorite = "Game Of Thrones";
            diary.stars = "8.5";
            diary.comments = "Amazing show well worth the watch";
            diary.upvotes = 2;
            await diary.save();
            diary = new Diary();
            diary.type = "Movie";
            diary.genre = "Action";
            diary.favorite = "Bad boys 3";
            diary.stars = "6.0";
            diary.comments = "One of Will Smith best movie";
            await diary.save();
            diary = await Diary.findOne({ genre: "Action" });
            validID = diary._id;
        } catch (error) {
            console.log(error);
        }
    });

    describe("GET /diaries", () => {
        it("should GET all the diarys entry", done => {
            request(server)
                .get("/diaries")
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200)
                .end((err, res) => {
                    try {
                        expect(res.body).to.be.a("array");
                        // expect(res.body.length).to.equal(2);
                        let result = _.map(res.body, diary => {
                            return {
                                type: diary.type,
                                genre: diary.genre,
                            };
                        });
                        expect(result).to.deep.include({
                            type: "Series",
                            genre: "Fiction",
                        });

                        expect(result).to.deep.include({
                            type: "Movie",
                            genre: "Action"
                        });
                        done();
                    } catch (e) {
                        done(e);
                    }
                });
        });

});

});