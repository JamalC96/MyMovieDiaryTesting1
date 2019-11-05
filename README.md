# MyMovieDiaryTesting1

<h1> Jamal Cunningham </h1>

20075085

<br>

Agile Software Practice

<h1> Overview </h1>

My Users model stores the users email , password and mebership points. My Diaries model stores type , genre , favorite, stars and comments. I have implemented fuzzy search that allows the users to look up their favorite movioe or series. diarys are upvoted.

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
     
    
    
    
    
    

<h1> Testing </h1>


> mymoviediary@0.0.0 test C:\Users\User\WebstormProjects\MyMovieDiaryTesting1
> cross-env NODE_ENV=test mocha --exit



  Diariess
    GET /diaries
(node:6380) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
(node:6380) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
Successfully Connected to [ admin ]
      √ should GET all the diarys entry (119ms)
      GET /diaries/:id
        when the id is valid
          √ should return the matching diary (177ms)
        when the id is invalid
          √ should return the NOT found message (78ms)
      GET /diaries/type/:type
        when the id is valid
          √ should return the matching diary (1107ms)
        when the type is invalid
          √ should return the NOT found message (79ms)
      GET /diaries/genre/:genre
        when the genre is valid
          √ should return the matching diary (95ms)
        when the type is invalid
          √ should return the NOT found message (77ms)
    PUT /diaries/:id/vote
      when the id is valid
PUT /diaries/5dc20955b076fc18ec60b6e2/votes 404 13.195 ms - 8410
        1) should return a message and the donation upvoted by 1
      when the id is invalid
PUT /donations/1100001/vote 404 3.169 ms - 8410
        √ should return a 404 and a message for invalid diary id (79ms)
    DELETE /diaries/:id
      when id is valid
        √ should return a confirmation message and the deleted diary (73ms)
      when id is invalid
        √ should return an error message (84ms)
    DELETE /diaries/genre/:genre
      when genre is valid
        √ should return a confirmation message and the deleted diary (84ms)
      when genre is invalid
        √ should return an error message (1038ms)

  Userss
Error: undefined

Use debug option for more info: new MongoMemoryServer({ debug: true })
    at C:\Users\User\WebstormProjects\MyMovieDiaryTesting1\node_modules\mongodb-memory-server-core\src\MongoMemoryServer.ts:84:17
    at process._tickCallback (internal/process/next_tick.js:68:7)
    GET /users
(node:6380) UnhandledPromiseRejectionWarning: Error: undefined

Use debug option for more info: new MongoMemoryServer({ debug: true })
    at C:\Users\User\WebstormProjects\MyMovieDiaryTesting1\node_modules\mongodb-memory-server-core\src\MongoMemoryServer.ts:84:17
    at process._tickCallback (internal/process/next_tick.js:68:7)
(node:6380) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 1)
(node:6380) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
      √ should GET all the users entry (1053ms)
    GET /users/:id
      when the id is valid
        √ should return the matching user (95ms)
    when the id is invalid
      √ should return the NOT found message (84ms)
    GET /users/username/:username
      when the username is valid
        √ should return the matching user (1084ms)
    when the username is invalid
      √ should return the NOT found message (195ms)
    PUT /users/:id/vote
      when the id is valid
PUT /users/5dc20964b076fc18ec60b6f8/votes 404 3.243 ms - 9601
        2) should return a message and the user membershipPoints upvoted by 2000
      when the id is invalid
        √ should return a 404 and a message for invalid user id (86ms)
    DELETE /users/:id
      when id is valid
        √ should return a confirmation message and the deleted user (494ms)
      when id is invalid
        √ should return an error message (75ms)
    DELETE /users/users/:username
      when username is valid
        3) should return a confirmation message and the deleted username
      when user is invalid
        √ should return an error message (1041ms)


  21 passing (32s)
  3 failing

  1) Diariess
       PUT /diaries/:id/vote
         when the id is valid
           should return a message and the donation upvoted by 1:
     AssertionError: object tested must be an array, an object, or a string, but undefined given
      at C:\Users\User\WebstormProjects\MyMovieDiaryTesting1\test\functional\api/diariesTest.js:224:56
      at process._tickCallback (internal/process/next_tick.js:68:7)

  2) Userss
       PUT /users/:id/vote
         when the id is valid
           should return a message and the user membershipPoints upvoted by 2000:
     AssertionError: object tested must be an array, an object, or a string, but undefined given
      at C:\Users\User\WebstormProjects\MyMovieDiaryTesting1\test\functional\api/diariesTest.js:510:56
      at process._tickCallback (internal/process/next_tick.js:68:7)

  3) Userss
       DELETE /users/users/:username
         when username is valid
           should return a confirmation message and the deleted username:

      Uncaught AssertionError: expected { Object (_events, _eventsCount, ...) } to have status code 500 but got 200
      + expected - actual

      -200
      +500

      at C:\Users\User\WebstormProjects\MyMovieDiaryTesting1\test\functional\api/diariesTest.js:594:45
      at Test.Request.callback (node_modules\superagent\lib\node\index.js:716:12)
      at parser (node_modules\superagent\lib\node\index.js:916:18)
      at IncomingMessage.res.on (node_modules\superagent\lib\node\parsers\json.js:19:7)
      at endReadableNT (_stream_readable.js:1145:12)
      at process._tickCallback (internal/process/next_tick.js:63:19)


         

    

    


<br>


I have implementeedFuzzy serach  as part of additional fuctionality this was in order to help out users to serach user without typing out their full name. Testing for fuzzy serach was also implemented on my testing phase.
