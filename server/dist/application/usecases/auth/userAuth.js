"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.userRegister = void 0;
const user_1 = __importDefault(require("../../../entities/user"));
const userRegister = async (user, userRepository, authService) => {
    user.password = await authService.encryptPassword(user?.password);
    const { firstName, lastName, email, phoneNumber, password } = user;
    const userEntity = (0, user_1.default)(firstName, lastName, email, phoneNumber, password);
    console.log(userEntity.getFirstName());
    const createdUser = await userRepository.addUser(userEntity);
    const applicantId = createdUser?._id;
    const token = authService.generateToken(createdUser?._id.toString());
    return { token, applicantId };
};
exports.userRegister = userRegister;
const getUserByEmail = async ({ email }, userRepository) => {
    const user = await userRepository.getUserByEmail(email);
    return user;
};
exports.getUserByEmail = getUserByEmail;
