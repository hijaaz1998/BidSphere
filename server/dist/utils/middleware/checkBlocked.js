"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../../frameworks/databse/model/userModel"));
const checkBlocked = async (req, res, next) => {
    const id = req.userId;
    const user = await userModel_1.default.findById(id);
    const isBlocked = user?.isBlocked;
    if (isBlocked) {
        return res.json({
            blocked: true
        });
    }
    else {
        next();
    }
};
exports.default = checkBlocked;
