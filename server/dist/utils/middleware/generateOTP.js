"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtp = void 0;
function generateOtp() {
    return Math.floor(1000 + Math.random() * 9000);
}
exports.generateOtp = generateOtp;
