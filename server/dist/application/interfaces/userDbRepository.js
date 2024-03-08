"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDbRepository = void 0;
const userDbRepository = (repository) => {
    const addUser = async (user) => {
        return await repository.addUser(user);
    };
    const getUserByEmail = async (email) => {
        return await repository.getUserByEmail(email);
    };
    const getAllUsers = async () => {
        return await repository.getAllUsers();
    };
    const blockUser = async (userId) => {
        return await repository.blockUser(userId);
    };
    const getUserSuggestion = async (userId) => {
        return await repository.getSuggestion(userId);
    };
    const followUser = async (followed, followedBy) => {
        return await repository.followTheUser(followed, followedBy);
    };
    const addUserByGoogle = async (firstName, lastName, email, jti) => {
        return await repository.googleAuth(firstName, lastName, email, jti);
    };
    const unfollowUser = async (logedInUser, unfollowedId) => {
        return await repository.unfollowTheUser(logedInUser, unfollowedId);
    };
    const checkEmail = async (email) => {
        return await repository.checkEmailIsThere(email);
    };
    const changePassword = async (email, password) => {
        return await repository.changeThePassword(email, password);
    };
    const getFollowing = async (userId) => {
        return await repository.getFollowingList(userId);
    };
    const getFollowers = async (userId) => {
        return await repository.getFollowersList(userId);
    };
    const getUsersInfo = async (userId) => {
        return await repository.getUserInfo(userId);
    };
    const searchUser = async (userId, search) => {
        return await repository.userSearch(userId, search);
    };
    const getFavorite = async (userId) => {
        return await repository.getFavorites(userId);
    };
    const updateProfile = async (data, userId) => {
        return await repository.profileUpdate(data, userId);
    };
    return {
        addUser,
        getUserByEmail,
        getAllUsers,
        blockUser,
        getUserSuggestion,
        followUser,
        addUserByGoogle,
        unfollowUser,
        checkEmail,
        changePassword,
        getFollowing,
        getFollowers,
        getUsersInfo,
        searchUser,
        getFavorite,
        updateProfile
    };
};
exports.userDbRepository = userDbRepository;
