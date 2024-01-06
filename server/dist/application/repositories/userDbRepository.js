"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDbRepository = void 0;
const userDbRepository = (repository) => {
    const addUser = async (user) => {
        await repository.addUser(user);
    };
    const getUserByEmail = async (email) => {
        await repository.getUser(email);
    };
    return {
        addUser,
        getUserByEmail
    };
};
exports.userDbRepository = userDbRepository;
