"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../config"));
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(config_1.default.MONGO_DB_URL);
        console.log("Database connected successfully");
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = connectDB;
