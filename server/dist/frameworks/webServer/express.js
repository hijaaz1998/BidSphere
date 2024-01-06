"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const expressConfig = (app) => {
    // app.use(cors());
    app.use(express_1.default.json());
    app.use((0, morgan_1.default)("dev"));
    app.use(express_1.default.urlencoded({ extended: true }));
};
exports.default = expressConfig;
