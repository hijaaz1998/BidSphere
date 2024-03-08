"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePassword = exports.blockUsers = exports.getUsers = void 0;
const getUsers = async (userRepository) => {
    return await userRepository.getAllUsers();
};
exports.getUsers = getUsers;
const blockUsers = async (userId, userRepository) => {
    return await userRepository.blockUser(userId);
};
exports.blockUsers = blockUsers;
const removePassword = (object) => {
    let { password, ...userWithoutPassword } = object;
    return userWithoutPassword;
};
exports.removePassword = removePassword;
