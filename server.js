
const jwt = require("jsonwebtoken");
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressjwt = require("express-jwt");
const app = express();

//
const http = require('http').Server(app);
const io = require('socket.io')(http);
//
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

const users = [
  {id: 1, username: "user1", password: "123456"},
  {id: 2, username: "user2", password: "123456"},
  {id: 3, username: "user3", password: "123456"}

];

app.post('/login', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send("Error. Please enter the correct username and password")
  }
  const user = users.find((u) => {
    return u.username === req.body.username && u.password === req.body.password;
  });


  if(user) {
    // res.send(
    //   `I received your POST request. This is what you sent me: ${req.body.username} ${req.body.password}`,
    // );
    const token = jwt.sign({
      sub: user.id,
      username: user.username
    }, "mykey", {expiresIn: "3 hours"});
    res.status(200).send({access_token: token})
    
  }
  else {
    res.status(401).send("Error")
  }
  console.log(req.body);
  
});

const jwtCheck = expressjwt({    
  secret: "mykey"
}); 
          
app.get("/secret", jwtCheck, (req, res) => {
  res.status(200).send("Only logged in people can see me");
});

io.on('connection', (socket) => {
  console.log(socket.id);

  socket.on('SEND_MESSAGE', data => {
    io.emit('RECEIVE_MESSAGE', data);
  } )
});

// io.on('connection', () =>{
//   console.log('a user is connected')
// })



if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
const server = http.listen(port, () => {
  console.log('server is running on port', server.address().port);
});