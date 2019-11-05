let diaries = require('../models/diaries')
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Diary = require('../models/diaries');
let uriUtil = require('mongodb-uri');

let Fuse = require ('fuse.js');

var mongodbUri = 'mongodb+srv://Jamal_96:cunningham96@wit-webapp-cluster-iwlzg.mongodb.net/diariestesb?retryWrites=true&w=majority';



var options = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
        "favorite"
    ]
};


mongoose.connect('mongodb://localhost:27017/diariesdb',
    {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;




db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});

router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    Diary.find(function(err, diaries) {
        if (err)
            res.send(err);
        else
        res.send(JSON.stringify(diaries,null,5));
    });
}


router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Diary.find({ "_id" : req.params.id },function(err, diary) {
        if (err)
            res.json({ message: 'Diary Entry NOT Found!!!', errmsg : err } );

        else
            res.send(JSON.stringify(diary,null,5));
    });
}


router.findType = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Diary.find({ "type" : req.params.type },function(err, diary) {
        if (err)
            res.json({ message: 'Diary Entry NOT Found!!!', errmsg : err } );

        else
            res.send(JSON.stringify(diary,null,5));
    });
}


router.findGenre = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Diary.find({ "genre" : req.params.genre },function(err, diary) {
        if (err)
            res.json({ message: 'Diary Entry NOT Found!!!', errmsg : err } );

        else
            res.send(JSON.stringify(diary,null,5));
    });
}

router.findFuzzy = (req, res) => {
// Return a JSON representation of our list


    Diary.find(function(err, diaries) {
        if (err)
            res.send(err);
        else
           var fuse = new Fuse(diaries,options);
           var result = fuse.search(req.body.value);
           res.send({result});
    });

}

router.addDiary = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var diary = new Diary();

    diary.type = req.body.type;
    diary.genre = req.body.genre;
    diary.favorite = req.body.favorite;
    diary.stars = req.body.stars;
    diary.comments = req.body.comments;

    diary.save(function(err) {
        if (err)
            res.json({ message: 'Donation NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Donation Successfully Added!', data: diary });
    });
}



router.incrementUpvotes = (req, res) => {
    // Find the relevant donation based on params id passed in
    // Add 1 to upvotes property of the selected donation based on its id
    var diary = getByValue(diaries,req.params.id);

    if (diary != null) {
        diary.upvotes += 1;
        res.json({status : 200, message : 'UpVote Successful' , diary : diary });
    }
    else
        res.send('Diary Entry NOT Found - UpVote NOT Successful!!');
}

router.incrementUpvotes = (req, res) => {

    Diary.findById(req.params.id, function(err,diary) {
        if (err)
            res.json({ message: 'Donation NOT Found!', errmsg : err } );
        else {
            diary.upvotes += 1;
            diary.save(function (err) {
                if (err)
                    res.json({ message: 'Diary Entry NOT UpVoted!', errmsg : err } );
                else
                    res.json({ message: 'Diary Entry Successfully Upvoted!', data: diaries });
            });
        }
    });
}




router.deleteDiary = (req, res) => {

    Diary.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'Diary NOT Deleted!', errmsg : err } );
        else
            res.json({ message: 'Diary Entry was Successfully Deleted!'});
    });
}

router.deleteGenre = (req, res) => {

    Diary.findByIdAndRemove(req.params.genre, function(err) {
        if (err)
            res.json({ message: 'Diary NOT Deleted!', errmsg : err } );
        else
            res.json({ message: 'Diary Type was Successfully Deleted!'});
    });
}

router.findTotalVotes = (req, res) => {

    Diary.find(function(err, diaries) {
        if (err)
            res.send(err);
        else
            res.json({ totalvotes : getTotalVotes(diaries) });
    });
}

router.findTotalDiaries = (req, res) => {

    var diaries =  Diary.length;
    var err;
        if (err)
            res.send(err);
        else
            res.json({ TotalDiaries: "Total", diaries});
    }

function getByValue(array, id) {
    var result  = array.filter(function(obj){return obj.id == id;} );
    return result ? result[0] : null; // or undefined
}


function getTotalVotes(array) {
    let totalVotes = 0;
    array.forEach(function(obj) { totalVotes += obj.upvotes; });
    return totalVotes;
}

/*function getTotalDiaries() {
    let totalDiaries = 0;
    for (i=0; i < diaries.length; ++i)
    {
        totalDiaries += diaries[i];
    }
    return totalDiaries;
}

 */

module.exports = router;









