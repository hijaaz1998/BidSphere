"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = __importDefault(require("../../../adapters/adminController/adminController"));
const authServiceInterface_1 = require("../../../application/services/authServiceInterface");
const authService_1 = require("../../services/authService");
const userDbRepository_1 = require("../../../application/interfaces/userDbRepository");
const userRepositoryMongoDb_1 = require("../../databse/repositories/userRepositoryMongoDb");
const auctionDbRepository_1 = require("../../../application/interfaces/auctionDbRepository");
const auctionRepositoryMongoDb_1 = require("../../databse/repositories/auctionRepositoryMongoDb");
const productDbRepository_1 = require("../../../application/interfaces/productDbRepository");
const productRepositoryMongoDb_1 = require("../../databse/repositories/productRepositoryMongoDb");
const adminRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, adminController_1.default)(authServiceInterface_1.authServiceInterface, authService_1.authService, userDbRepository_1.userDbRepository, userRepositoryMongoDb_1.userRepositoryMongoDb, auctionDbRepository_1.auctionDbRepository, auctionRepositoryMongoDb_1.auctionRepositoryMongoDb, productDbRepository_1.productDbRepository, productRepositoryMongoDb_1.productRepositoryMongoDb);
    router.post('/login', controller.loginAdmin);
    router.get('/users', controller.getAllUsers);
    router.patch('/block_user/:userId', controller.blockUser);
    router.get('/getAuctions', controller.getAuctions);
    router.get('/getPosts', controller.getPosts);
    router.put('/block_auction/:id', controller.blockAuction);
    router.get('/get_reports', controller.getReports);
    router.get('/get_income', controller.getIncome);
    router.put('/approve_auction/:paymentId', controller.approveAuction);
    router.get('/dashboard', controller.dashboard);
    return router;
};
exports.default = adminRouter;
