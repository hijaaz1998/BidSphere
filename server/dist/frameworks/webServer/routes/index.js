"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRoute_1 = __importDefault(require("./authRoute"));
const productRoute_1 = __importDefault(require("./productRoute"));
const adminRoute_1 = __importDefault(require("./adminRoute"));
const auctionRoute_1 = __importDefault(require("./auctionRoute"));
const chatRoute_1 = __importDefault(require("./chatRoute"));
const routes = (app) => {
    app.use('/api/product', (0, productRoute_1.default)());
    app.use('/api/user', (0, authRoute_1.default)());
    app.use('/api/admin', (0, adminRoute_1.default)());
    app.use('/api/auction', (0, auctionRoute_1.default)());
    app.use('/api/messages', (0, chatRoute_1.default)());
};
exports.default = routes;
