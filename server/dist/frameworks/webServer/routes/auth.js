"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../../../adapters/authController/authController"));
const userDbRepository_1 = require("../../../application/repositories/userDbRepository");
const authServiceInterface_1 = require("../../../application/services/authServiceInterface");
const authService_1 = require("../../services/authService");
const userRepositoryMongoDb_1 = require("../../databse/repositories/userRepositoryMongoDb");
const authRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, authController_1.default)(authServiceInterface_1.authServiceInterface, authService_1.authService, userDbRepository_1.userDbRepository, userRepositoryMongoDb_1.userRepositoryMongoDb);
    router.post('/login', controller.registerUser);
    router.get('/get', controller.handleGetUser);
    return router;
};
exports.default = authRouter;
