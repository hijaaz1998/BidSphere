"use strict";
// authMiddleware.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (token) {
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
            const payloadObject = JSON.parse(decodedToken.payload);
            req.userId = payloadObject;
            next();
        }
        catch (error) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
    }
    else {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }
};
exports.default = verifyToken;
