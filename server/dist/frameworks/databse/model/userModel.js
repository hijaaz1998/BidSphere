"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        maxLength: 32
    },
    lastName: {
        type: String,
        maxLength: 32,
    },
    phoneNumber: {
        type: Number,
        maxlength: 10,
    },
    email: {
        type: String,
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please add a valid email'],
    },
    password: {
        type: String,
        trim: true,
    }
}, { timestamps: true });
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
