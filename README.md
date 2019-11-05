# MyMovieDiaryTesting1

<h1> Jamal Cunningham </h1>

20076515

Agile Software Practice

## Overview.

Reviews of users , each review has upvotes. Users have name,address,gender and userpoints. Users can be upvoted. Admin is able do delte users edit user and same with the reviews. There is fuzzy search implement in users, incase admin wants to search uses without full of their name. App also allows to show most upvoted user and review.

<h1> Routes </h1>

<h2><u>Diary Routes </u></h2>

<p> app.get('/diaries', diaries.findAll);</p>
<p>app.get('/diaries/votes', diaries.findTotalVotes);</p>
<p>app.get('/diaries/all', diaries.findTotalDiaries);</p>
<p>app.get('/diaries/:id', diaries.findOne);</p>

<p>app.get('/diaries/type/:type', diaries.findType);</p>

<p>app.get('/diaries/genre/:genre', diaries.findGenre);</p>


<p>app.post('/diaries/search', diaries.findFuzzy);</p>
<p>app.post('/diaries',diaries.addDiary);</p>


<p>app.put('/diaries/:id/vote', diaries.incrementUpvotes);</p>

</p>app.delete('/diaries/:id', diaries.deleteDiary);</p>
<p>app.delete('/diaries/type/:type', diaries.deleteGenre);</p>

<h2><u>User Routes </u></h2>

<p>app.get('/users', users.findAllUsers);</p>

<p>app.get('/users/:id', users.findOneID);</p>

<p>app.get('/users/username/:username', users.findUsername);</p>

<p>app.post('/users',users.addUser); </p>

<p>app.put('/users/:id/vote', users.incrementPoints);</p>

<p>app.delete('/users/:id', users.deleteUser);</p>

<p>app.delete('/users/users/:username', users.deleteUsername);</p>

<h1> Data Model </h1>



<h2> Users Mode </h2>

     {
          "membershipPointsPoints": 2000,
          "_id": "5dc14582f7205d0388ea959e",
          "username": "DavidM76",
          "password": "Hello123",
          
     },

<h2>Diaries Model</h2>

     {      "type" : "Movie";
            "genre" :"Action";
            "favorite " :"Bad Boys 3";
            stars = "6.0";
            comments = "One of Will Smith best movie";
            upvotes = 2;
     }





I have implementeedFuzzy serach  as part of additional fuctionality this was in order to help out users to serach user without typing out their full name. Testing for fuzzy serach was also implemented on my testing phase.
