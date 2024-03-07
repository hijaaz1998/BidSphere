import cors from 'cors';
import http from 'http';
import connectDB from './frameworks/databse/connection';
import express, { Application } from 'express';
import { Server as SocketIoServer } from 'socket.io';
import expressConfig from './frameworks/webServer/express';
import routes from './frameworks/webServer/routes';
import serverConfig from './frameworks/webServer/server';

const app: Application = express();
const server = http.createServer(app);

const io = new SocketIoServer(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

io.on("connection", (socket) => {

  socket.on('setup', (userData) => {
    socket.join(userData);
    socket.emit('connected');
  });

  socket.on('joinChat', (room) => {
    socket.join(room);
  });

  socket.on('leaveChat', (room) => {
    socket.leave(room);
  });

  socket.on('new message', (newMessageRecieved) => {
    let chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("not defined");

    chat.users.forEach((user: any) => {
      if (user._id == newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.on('bidded', ({ amount, userId, firstName, lastName }) => {
    io.emit("bid", {userId, amount, firstName, lastName });
  });
});

connectDB();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}));

expressConfig(app);

routes(app);



serverConfig(server).startServer();
