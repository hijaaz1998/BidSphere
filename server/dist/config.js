"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const configKeys = {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    MONGO_DB_URL: process.env.DATABASE,
    JWT_SECRET_ADMIN: process.env.JWT_SECRET_ADMIN,
    MONGO_DB_CLUSTER: process.env.CLUSTER_URL
};
exports.default = configKeys;
