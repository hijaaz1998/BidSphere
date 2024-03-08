"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFavorites = exports.userSearch = exports.getUserInfo = exports.getFollowersList = exports.getFollowingList = exports.changeThePassword = exports.checkEmail = exports.unfollowTheUser = exports.googleAuthRegister = exports.followTheUser = exports.getUserSuggestion = exports.userLogin = exports.profileUpdate = exports.userRegister = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const user_1 = __importDefault(require("../../../entities/user"));
const appError_1 = __importDefault(require("../../../utils/middleware/appError"));
const read_1 = require("../user/read");
const userRegister = async (user, userRepository, authService) => {
    user.email = user?.email.toLocaleLowerCase();
    const isExistingEmail = await userRepository.getUserByEmail(user?.email);
    if (isExistingEmail) {
        return new appError_1.default('Email already exists', httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    user.password = await authService.encryptPassword(user?.password);
    const { firstName, lastName, email, phoneNumber, password } = user;
    const userEntity = (0, user_1.default)(firstName, lastName, email, phoneNumber, password);
    const createdUser = await userRepository.addUser(userEntity);
    const token = authService.generateToken(createdUser?._id.toString());
    return { token, createdUser };
};
exports.userRegister = userRegister;
const profileUpdate = async (userRepository, data, userId) => {
    const updated = userRepository.updateProfile(data, userId);
    return updated;
};
exports.profileUpdate = profileUpdate;
const userLogin = async (email, password, userRepository, authService) => {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
        return new appError_1.default('This user doesnt exist', httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    if (!user.password) {
        return new appError_1.default('This user is already signed in with google, try login with google', httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const isPasswordCorrect = await authService.comparePassword(password, user.password);
    if (!isPasswordCorrect) {
        return new appError_1.default('Invalid email or password', httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const userDetails = (0, read_1.removePassword)(user);
    const token = authService.generateToken(JSON.stringify(userDetails._id));
    return { token, userDetails };
};
exports.userLogin = userLogin;
const getUserSuggestion = async (userRepository, userId) => {
    const data = await userRepository.getUserSuggestion(userId);
    return data;
};
exports.getUserSuggestion = getUserSuggestion;
const followTheUser = async (userRepository, followed, followedBy) => {
    const data = await userRepository.followUser(followed, followedBy);
    if (data) {
        return data;
    }
};
exports.followTheUser = followTheUser;
const googleAuthRegister = async (firstName, lastName, email, jti, userRepository, authService) => {
    const user = await userRepository.addUserByGoogle(firstName, lastName, email, jti);
    const token = authService.generateToken(JSON.stringify(user?._id));
    return { token, user };
};
exports.googleAuthRegister = googleAuthRegister;
const unfollowTheUser = async (userRepository, logedInUser, unfollowedId) => {
    const res = await userRepository.unfollowUser(logedInUser, unfollowedId);
    return res;
};
exports.unfollowTheUser = unfollowTheUser;
const checkEmail = async (userRepository, email) => {
    const check = await userRepository.checkEmail(email);
    return check;
};
exports.checkEmail = checkEmail;
const changeThePassword = async (userRepository, authService, email, password) => {
    const encrypted = await authService.encryptPassword(password);
    const updated = await userRepository.changePassword(email, encrypted);
    return updated;
};
exports.changeThePassword = changeThePassword;
const getFollowingList = async (userRepository, userId) => {
    const following = await userRepository.getFollowing(userId);
    return following;
};
exports.getFollowingList = getFollowingList;
const getFollowersList = async (userRepository, userId) => {
    const followers = await userRepository.getFollowers(userId);
    return followers;
};
exports.getFollowersList = getFollowersList;
const getUserInfo = async (userRepository, userId) => {
    const user = await userRepository.getUsersInfo(userId);
    return user;
};
exports.getUserInfo = getUserInfo;
const userSearch = async (userRepository, userId, search) => {
    const result = await userRepository.searchUser(userId, search);
    return result;
};
exports.userSearch = userSearch;
const getFavorites = async (userRepository, userId) => {
    const favorites = await userRepository.getFavorite(userId);
    return favorites;
};
exports.getFavorites = getFavorites;
