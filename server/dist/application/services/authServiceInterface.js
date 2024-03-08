"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServiceInterface = void 0;
const authServiceInterface = (service) => {
    const encryptPassword = (password) => {
        return service.encryptPassword(password);
    };
    const generateToken = (payload) => service.generateToken(payload);
    const generateTokenAdmin = (id) => service.generateTokenAdmin(id);
    const comparePassword = (password, hashedPassword) => service.comparePassword(password, hashedPassword);
    return {
        encryptPassword,
        generateToken,
        comparePassword,
        generateTokenAdmin
    };
};
exports.authServiceInterface = authServiceInterface;
