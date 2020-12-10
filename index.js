require("dotenv").config();

const express = require("express");
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  }
});
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./src/db");
const {
  User,
  Message
} = require("./src/api/routes");
const {MessageModel} = require('./src/api/models')

// parse application/x-www-form-urlencoded & application/json
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));

db();

app.disable("x-powered-by");

// access cors (temporary)
app.use(cors());

app.use(
  "/api/v1",
  Message,
  User
);

// use static
app.use(express.static(path.resolve(__dirname, "./build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./build/index.html"));
});

// handle 404 (user errors)
app.use((req, res, next) => {
  res.status(404).send(`<h2>Oops 404</h2> <h3>We think you are lost!</h3>`);
});

io.on('connection', (socket) => {
  socket.emit(socket.client.id)
  console.log('User connected', socket.client.id);
  socket.join('tst')
  socket.on('send_msg', async ({id, msg}) => {
    try {
      const createdMsg = await MessageModel.create({senderId: id, msg: msg})
      const messages = await MessageModel.find().sort({createdAt: -1})
      io.sockets.in('tst').emit('send_msg', messages);
      // socket.emit('send_msg',createdMsg)
    } catch (e) {
      console.log(e)
    }
  });
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


http.listen(process.env.PORT, () => {
  console.log(`Server starting on port ${process.env.PORT}`);
});