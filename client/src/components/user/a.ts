// import cors from 'cors';
// import http from 'http';
// import connectDB from './frameworks/databse/connection';
// import express, {Application, Express, Request, Response} from 'express';
// import {Server as SocketIoServer} from 'socket.io';
// import expressConfig from './frameworks/webServer/express';
// import routes from './frameworks/webServer/routes';
// import serverConfig from './frameworks/webServer/server';

// const app: Application = express();
// const server = http.createServer(app);

// export const io = new SocketIoServer(server, {
//   pingTimeout: 60000,
//   cors: {
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST'],
//     credentials: true
//   }
// });

// io.on("connection", (socket) => {
//   console.log("connected to socket.io");

//   socket.on('setup',(userData) => {
//     console.log("userdata", userData);
//     socket.join(userData)
//     socket.emit('connected')
//   })

//   socket.on('joinChat', (room) => {    
//     socket.join(room);
//     console.log('user joined room', room);
//   })

//   socket.on('new message', (newMessageRecieved) => {
//     let chat = newMessageRecieved.chat
//     console.log("chat", chat);
//     console.log("newMessageRecieved.sender._id",newMessageRecieved.sender._id);
    

//     if(!chat.users) return console.log("not defined")

//     chat.users.forEach((user: any) => {
//       if(user._id == newMessageRecieved.sender._id) return 
//       console.log('socketing');
      
//       socket.in(user._id).emit("message recieved", newMessageRecieved)
//     });
    
//   })
// })

// connectDB();
// app.use(express.json());
// app.use(cors({
//     origin: 'http://localhost:5173', // Allow requests from this origin
//     methods: ['GET', 'POST' , 'PUT' , 'DELETE' , 'PATCH'],      // Allow these HTTP methods, // Allow these headers
//   }));
  

// expressConfig(app);

// routes(app);



// serverConfig(server).startServer();