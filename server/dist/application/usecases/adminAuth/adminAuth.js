"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = void 0;
const adminLogin = async (email, password, authService) => {
    const adminEmail = "admin@gmail.com";
    const adminpassword = '123456';
    const id = "ObjectId(6502229c761cead53ce1099u)";
    if (email == adminEmail && password == adminpassword) {
        const token = authService.generateToken(id);
        return token;
    }
    else {
        throw new Error('invalid email or password');
    }
};
exports.adminLogin = adminLogin;
