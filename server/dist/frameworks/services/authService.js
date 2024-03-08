"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const authService = () => {
    const encryptPassword = async (password) => {
        const salt = await bcryptjs_1.default.genSalt(10);
        password = await bcryptjs_1.default.hash(password, salt);
        return password;
    };
    const generateToken = (payload) => {
        const token = jsonwebtoken_1.default.sign({ payload }, config_1.default.JWT_SECRET, {
            expiresIn: '5d',
        });
        return token;
    };
    const generateTokenAdmin = (id) => {
        const adminToken = jsonwebtoken_1.default.sign({ id }, config_1.default.JWT_SECRET_ADMIN, {
            expiresIn: '5d'
        });
        return adminToken;
    };
    const comparePassword = (password, hashedPassword) => bcryptjs_1.default.compare(password, hashedPassword);
    return {
        encryptPassword,
        generateToken,
        comparePassword,
        generateTokenAdmin
    };
};
exports.authService = authService;
