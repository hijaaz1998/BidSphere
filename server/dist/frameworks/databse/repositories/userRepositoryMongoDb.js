"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepositoryMongoDb = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const userRepositoryMongoDb = () => {
    const addUser = async (user) => {
        const newUser = new userModel_1.default({
            firstName: user.getFirstName(),
            lastName: user.getLastName(),
            email: user.getEmail(),
        });
        newUser.save();
        return newUser;
    };
    const getUser = async (email) => {
        const user = await userModel_1.default.findOne({ email });
        return user;
    };
    return {
        addUser,
        getUser
    };
};
exports.userRepositoryMongoDb = userRepositoryMongoDb;
