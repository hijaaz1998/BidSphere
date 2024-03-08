"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const connection_1 = __importDefault(require("./frameworks/databse/connection"));
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const express_2 = __importDefault(require("./frameworks/webServer/express"));
const routes_1 = __importDefault(require("./frameworks/webServer/routes"));
const server_1 = __importDefault(require("./frameworks/webServer/server"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ["http://localhost:5173", 'https://ijasmuhammed.online', 'https://ijasmuhammed.online', '*'],
        methods: ["GET", "POST"],
        credentials: true,
    },
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
        if (!chat.users)
            return console.log("not defined");
        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id)
                return;
            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    });
    socket.on('bidded', ({ amount, userId, firstName, lastName }) => {
        io.emit("bid", { userId, amount, firstName, lastName });
    });
});
(0, connection_1.default)();
app.use(express_1.default.json());
const corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://ijasmuhammed.online",
        "http://localhost:1000",
        "https://ijasmuhammed.online",
    ],
    methods: "GET,PUT,PATCH,POST,DELETE",
};
app.use((0, cors_1.default)(corsOptions));
(0, express_2.default)(app);
(0, routes_1.default)(app);
(0, server_1.default)(server).startServer();
