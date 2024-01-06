"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userAuth_1 = require("../../application/usecases/auth/userAuth");
const authController = (authServiceInterface, authServiceImpl, userDbRepository, userDbRepositoryImpl) => {
    const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
    const authService = authServiceInterface(authServiceImpl());
    const registerUser = (0, express_async_handler_1.default)(async (req, res) => {
        const user = req.body;
        const { token, applicantId } = await (0, userAuth_1.userRegister)(user, dbRepositoryUser, authService);
        res.json({
            status: "success",
            message: 'USer Registered',
            token,
            applicantId,
        });
    });
    const handleGetUser = (0, express_async_handler_1.default)(async (req, res) => {
        const email = req.query.email;
        const data = await (0, userAuth_1.getUserByEmail)({ email }, dbRepositoryUser);
        res.json({
            status: "success",
            data
        });
    });
    return {
        registerUser,
        handleGetUser
    };
};
exports.default = authController;
