"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const connection_1 = __importDefault(require("./frameworks/databse/connection"));
const express_1 = __importDefault(require("express"));
const server_1 = __importDefault(require("./frameworks/webServer/server"));
const routes_1 = __importDefault(require("./frameworks/webServer/routes"));
const express_2 = __importDefault(require("./frameworks/webServer/express"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
(0, connection_1.default)();
(0, express_2.default)(app);
(0, routes_1.default)(app);
(0, server_1.default)(server).startServer();
