"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServiceInterface = void 0;
const authServiceInterface = (service) => {
    const encryptPassword = (password) => {
        return service.encryptPassword(password);
    };
    const generateToken = (payload) => service.generateToken(payload);
    return {
        encryptPassword,
        generateToken
    };
};
exports.authServiceInterface = authServiceInterface;
