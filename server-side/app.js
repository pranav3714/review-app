const express = require('express');
const cors = require('cors');
const auth = require('./authentication');
const jwt = require('jsonwebtoken');
const Comment = require('./models/comment.model');
const WebSocket = require('ws').Server
let server = require('http').createServer();

let authVerify = async (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1]
  ////console.log(token);
  let decoded;
  try {
    decoded = await jwt.verify(token, process.env.JWT_SECRET)
  } catch (e) {
    ////console.log(e.message);
    return res.status(200).json({status: e.message})
  }
  req.username = decoded.username
  next()
}

let objectTester = (req, arr) => {
  let count=0;
  let keys = Object.keys(req.body)
  if(keys.length == 0) return false
  for (var i = 0; i < arr.length; i++) {
    if(keys.indexOf(arr[i]) == -1) {
      return false
    }
  }
  return true
}
//auth.signUp('myemail1@gmail.com', 'myusername', 'passwor1Pd', 'fake name')
////console.log(auth.signIn( 'myusername', 'passwor1Pd' ));
const port = process.env.PORT || 3000
const app = express()
app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.get('/', function (req, res) {
  res.status(200).send(`<h1 style="text-align: center">Server dedicated for API Calls</h1>`)
})
app.post('/user/register', async (req, res) => {
  ////console.log(req.body);
  if(objectTester(req, ['email', 'username', 'password', 'name'])) {
    ////console.log(req.body);
    let response = await auth.signUp(req.body.email, req.body.username, req.body.password, req.body.name)
    ////console.log(response);
    if(!response.error) {
      res.status(200).json({status: "OK"})
    } else {
      res.status(200).json({status: response.message})
    }
  } else {
    res.status(200).json({status: "Invalid request object"})
  }
})
app.post('/user/login', async (req, res) => {
  ////console.log("login hit");
  if(objectTester(req, ['username', 'password'])) {
    let response = await auth.signIn(req.body.username, req.body.password);
    if(!response.error) {
      ////console.log(response);
      res.status(200).json({token: response.token})
    } else return res.status(200).json({status: response.message})
  } else return res.status(200).json({status: "Invalid request object"})
})
app.post('/comments/post', authVerify, async (req, res) => {
  ////console.log("comments/post hit!");
  if(objectTester(req, ['commentBody', 'movieId'])) {
    let commentObj = req.body;
    commentObj.author = req.username
    let commentSaver = new Comment(commentObj)
    try {
      await commentSaver.save()
    } catch (e) {
      return res.status(200).json(e)
    }
    return res.status(200).json({status: "OK"})
  } else return res.status(200).json({status: "Invalid request object"})
})
app.get('/comments/movie/:id', async (req, res) => {
  ////console.log("comments/movie/:id hit!");
  let id = req.params.id
  let comments = await Comment.find({movieId: id})
  res.status(200).json(comments)
})
app.get('/verify/:id', async (req, res) => {
  ////console.log('/verify/id hit!');
  let id = req.params.id
  let out = await auth.verify(id)
  if(out.error){
    res.status(200).json({status: out.message})
  } else {
    res.status(200).send('<h1 style="text-align: center">Verification Success!</h1> <h4 style="text-align: center">Close the browser and login now</h4>')
  }
})

let wss = new WebSocket({
  server: server
});
server.on('request', app);

wss.on('connection', (ws) => {
  let isVerified = false
  //ws.send("from server")

  ws.on('message', async(message) => {
    ////console.log(message);
    //console.log(message);
    let mesg = JSON.parse(message)
    if(mesg.type=="auth"){
      let response = await auth.verifyJwt(mesg.token)
      if(response.error){
        ws.destroy()
      } else {
        ws.username = response.username
        //console.log(response.username);
        ////console.log(response);
      }
    } else if(mesg.type == "chat") {
      if(ws.username){
        //console.log(mesg.value);
        mesg.author = ws.username
        //console.log(wss.clients);
        wss.clients.forEach(function(client) {
          // console.log("one");
          client.send(JSON.stringify(mesg));
        });
      } else {
        //console.log("destroy");
        ws.destroy()
      }
    } else {
      ws.destroy()
    }
  })
})

server.listen(port, function() {
  console.log(`http/ws server listening on ${port}`);
});
