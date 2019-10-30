const chai = require("chai");
const server = require("../../../bin/www");
const expect = chai.expect;
const request = require("supertest");
const _ = require("lodash");

let datastore = require("../../../models/diaries");

describe("Diariess", () => {
    describe("GET /diaries", () => {
        it("should return all the diaries", done => {
            request(server)
                .get("/diaries")
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.be.a("array");
                    expect(res.body.length).to.equal(3);
                    const result = _.map(res.body, diary => {
                        return { _id: diary._id, type: diary.type, genre: diary.genre, favorite: diary.favorite, stars: diary.stars,comments: diary.comments };
                    });
                    expect(result).to.deep.include({ _id: "5db377721c9d44000000ef7c", type: "Series", genre: "Fiction", favorite: "Game Of Thrones", stars: "8.5",  comments: "Amazing show well worth the watch and recommended"});
                    expect(result).to.deep.include({ _id: "5db6278e1c9d44000062b6d2", type: "Movie", genre: "Action", favorite: "Bad Boys 2", stars: "7.5",  comments: "WIll Smith is a top class actor."});
                    expect(result).to.deep.include({ _id: "5db62dea1c9d44000074d1d3", type: "Movie", genre: "Comedy", favorite: "Rush Hour 3", stars: "8.5",  comments: "Best Jackie Chan Movie I've seen!!"});

                    done(err);
                });

            });
        });
    });


