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
     
     
     
     <h1> Testing </h2>
     
     

  Diariess
    GET /diaries
(node:26620) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
(node:26620) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
Successfully Connected to [ admin ]
      1) should GET all the diarys entry
      GET /diaries/:id
        when the id is valid
          √ should return the matching diary (315ms)
        when the id is invalid
          √ should return the NOT found message (75ms)
      GET /diaries/type/:type
        when the id is valid
          √ should return the matching diary (290ms)
        when the type is invalid
          √ should return the NOT found message (73ms)
      GET /diaries/genre/:genre
        when the genre is valid
          √ should return the matching diary (183ms)
        when the type is invalid
          √ should return the NOT found message (718ms)
    PUT /diaries/:id/vote
      when the id is valid
PUT /diaries/5dc1cc72d31ed367fc6aad34/votes 404 9.551 ms - 8410
        2) should return a message and the donation upvoted by 1
      when the id is invalid
PUT /donations/1100001/vote 404 3.620 ms - 8410
        √ should return a 404 and a message for invalid diary id (74ms)
    DELETE /diaries/:id
      when id is valid
        √ should return a confirmation message and the deleted diary (391ms)
      when id is invalid
        √ should return an error message (204ms)
    DELETE /diaries/genre/:genre
      when genre is valid
        √ should return a confirmation message and the deleted diary (968ms)
      when genre is invalid
        √ should return an error message (65ms)

  Userss
Error: undefined

Use debug option for more info: new MongoMemoryServer({ debug: true })
    at C:\Users\User\WebstormProjects\MyMovieDiaryTesting1\node_modules\mongodb-memory-server-core\src\MongoMemoryServer.ts:84:17
    at process._tickCallback (internal/process/next_tick.js:68:7)
    GET /users
(node:26620) UnhandledPromiseRejectionWarning: Error: undefined

Use debug option for more info: new MongoMemoryServer({ debug: true })
    at C:\Users\User\WebstormProjects\MyMovieDiaryTesting1\node_modules\mongodb-memory-server-core\src\MongoMemoryServer.ts:84:17
    at process._tickCallback (internal/process/next_tick.js:68:7)
(node:26620) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 1)
(node:26620) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
      √ should GET all the users entry (430ms)
    GET /users/:id
      when the id is valid
        √ should return the matching user (1075ms)
    when the id is invalid
      √ should return the NOT found message (908ms)
    GET /users/username/:username
      when the username is valid
        √ should return the matching user (1133ms)
    when the username is invalid
      √ should return the NOT found message (185ms)
    PUT /users/:id/vote
      when the id is valid
PUT /users/5dc1cc8bd31ed367fc6aad4a/votes 404 2.144 ms - 9601
        3) should return a message and the user membershipPoints upvoted by 2000
      when the id is invalid
        √ should return a 404 and a message for invalid user id (1036ms)
    DELETE /users/:id
      when id is valid
        √ should return a confirmation message and the deleted user (931ms)
      when id is invalid
        √ should return an error message (574ms)
    DELETE /users/users/:username
      when username is valid
        4) should return a confirmation message and the deleted username
      when user is invalid
        √ should return an error message (62ms)


  20 passing (1m)
  4 failing

  1) Diariess
       GET /diaries
         should GET all the diarys entry:
     AssertionError: expected [ { type: 'Movie', genre: 'Action' } ] to deep include { type: 'Series', genre: 'Fiction' }
      at Test.<anonymous> (test\functional\api/diariesTest.js:100:48)
      at Test.assert (node_modules\supertest\lib\test.js:181:6)
      at localAssert (node_modules\supertest\lib\test.js:131:12)
      at C:\Users\User\WebstormProjects\MyMovieDiaryTesting1\node_modules\supertest\lib\test.js:128:5
      at Test.Request.callback (node_modules\superagent\lib\node\index.js:716:12)
      at parser (node_modules\superagent\lib\node\index.js:916:18)
      at IncomingMessage.res.on (node_modules\superagent\lib\node\parsers\json.js:19:7)
      at endReadableNT (_stream_readable.js:1145:12)
      at process._tickCallback (internal/process/next_tick.js:63:19)

  2) Diariess
       PUT /diaries/:id/vote
         when the id is valid
           should return a message and the donation upvoted by 1:
     AssertionError: object tested must be an array, an object, or a string, but undefined given
      at C:\Users\User\WebstormProjects\MyMovieDiaryTesting1\test\functional\api/diariesTest.js:224:56
      at process._tickCallback (internal/process/next_tick.js:68:7)

  3) Userss
       PUT /users/:id/vote
         when the id is valid
           should return a message and the user membershipPoints upvoted by 2000:
     AssertionError: object tested must be an array, an object, or a string, but undefined given
      at C:\Users\User\WebstormProjects\MyMovieDiaryTesting1\test\functional\api/diariesTest.js:510:56
      at process._tickCallback (internal/process/next_tick.js:68:7)

  4) Userss
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



npm ERR! Test failed.  See above for more details.
PS C:\Users\User\WebstormProjects\MyMovieDiaryTesting1> npm test

> mymoviediary@0.0.0 test C:\Users\User\WebstormProjects\MyMovieDiaryTesting1
> cross-env NODE_ENV=test mocha --exit



  Diariess
    GET /diaries
(node:28668) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
(node:28668) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
Successfully Connected to [ admin ]
      √ should GET all the diarys entry (122ms)
      GET /diaries/:id
        when the id is valid
          √ should return the matching diary (64ms)
        when the id is invalid
          √ should return the NOT found message (80ms)
      GET /diaries/type/:type
        when the id is valid
          √ should return the matching diary (63ms)
        when the type is invalid
          √ should return the NOT found message (62ms)
      GET /diaries/genre/:genre
        when the genre is valid
          √ should return the matching diary (67ms)
        when the type is invalid
          √ should return the NOT found message (1045ms)
    PUT /diaries/:id/vote
      when the id is valid
PUT /diaries/5dc1ccafb710486ffcb80b0a/votes 404 9.280 ms - 8410
        1) should return a message and the donation upvoted by 1
      when the id is invalid
PUT /donations/1100001/vote 404 1.579 ms - 8410
        √ should return a 404 and a message for invalid diary id (64ms)
    DELETE /diaries/:id
      when id is valid
        √ should return a confirmation message and the deleted diary (70ms)
      when id is invalid
        √ should return an error message (147ms)
    DELETE /diaries/genre/:genre
      when genre is valid
        √ should return a confirmation message and the deleted diary (891ms)
      when genre is invalid
        √ should return an error message (70ms)

  Userss
Error: undefined

Use debug option for more info: new MongoMemoryServer({ debug: true })
    at C:\Users\User\WebstormProjects\MyMovieDiaryTesting1\node_modules\mongodb-memory-server-core\src\MongoMemoryServer.ts:84:17
    at process._tickCallback (internal/process/next_tick.js:68:7)
    GET /users
(node:28668) UnhandledPromiseRejectionWarning: Error: undefined

Use debug option for more info: new MongoMemoryServer({ debug: true })
    at C:\Users\User\WebstormProjects\MyMovieDiaryTesting1\node_modules\mongodb-memory-server-core\src\MongoMemoryServer.ts:84:17
    at process._tickCallback (internal/process/next_tick.js:68:7)
(node:28668) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 1)
(node:28668) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
      √ should GET all the users entry (341ms)
    GET /users/:id
      when the id is valid
        √ should return the matching user (1161ms)
    when the id is invalid
      √ should return the NOT found message (69ms)
    GET /users/username/:username
      when the username is valid
        √ should return the matching user (157ms)
    when the username is invalid
      √ should return the NOT found message (79ms)
    PUT /users/:id/vote
      when the id is valid
PUT /users/5dc1ccc6b710486ffcb80b20/votes 404 3.089 ms - 9601
        2) should return a message and the user membershipPoints upvoted by 2000
      when the id is invalid
        √ should return a 404 and a message for invalid user id (196ms)
    DELETE /users/:id
      when id is valid
        √ should return a confirmation message and the deleted user (62ms)
      when id is invalid
        √ should return an error message (213ms)
    DELETE /users/users/:username
      when username is valid
        3) should return a confirmation message and the deleted username
      when user is invalid
        √ should return an error message (63ms)


  21 passing (42s)
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
