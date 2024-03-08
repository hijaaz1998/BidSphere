"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepositoryMongoDb = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const FavoriteModel_1 = __importDefault(require("../model/FavoriteModel"));
const shuffleArray_1 = require("../../../utils/middleware/shuffleArray");
const userRepositoryMongoDb = () => {
    const addUser = async (user) => {
        try {
            const newUser = new userModel_1.default({
                firstName: user.getFirstName(),
                lastName: user.getLastName(),
                email: user.getEmail(),
                phoneNumber: user.getPhoneNumber(),
                password: user.getPassword()
            });
            await newUser.save();
            return newUser;
        }
        catch (error) {
            console.log(error);
        }
    };
    const getUserByEmail = async (email) => {
        try {
            const user = await userModel_1.default.findOne({ email });
            if (user) {
                const { _id, firstName, lastName, password } = user;
                return { _id, firstName, lastName, password };
            }
            return null;
        }
        catch (error) {
            console.log(error);
        }
    };
    const getAllUsers = async () => {
        try {
            const user = await userModel_1.default.find();
            return user;
        }
        catch (error) {
            console.log(error);
        }
    };
    const blockUser = async (userId) => {
        try {
            const user = await userModel_1.default.findById(userId);
            if (!user) {
                console.log('User not found.');
                return;
            }
            user.isBlocked = !user.isBlocked;
            await user.save();
        }
        catch (error) {
            console.error('Error blocking/unblocking user:', error);
        }
    };
    const getSuggestion = async (userId) => {
        try {
            const loggedInUser = await userModel_1.default.findById(userId);
            const usersNotInFollowing = await userModel_1.default.find({
                _id: { $nin: [...loggedInUser.following, userId] }
            });
            const shuffledUsers = (0, shuffleArray_1.shuffleArray)(usersNotInFollowing);
            const randomUsers = shuffledUsers.slice(0, 5);
            return randomUsers;
        }
        catch (error) {
            console.error('Error getting random users:', error);
            throw error;
        }
    };
    const followTheUser = async (followedId, followedById) => {
        try {
            await userModel_1.default.updateOne({ _id: followedById }, { $addToSet: { following: followedId } });
            await userModel_1.default.updateOne({ _id: followedId }, { $addToSet: { followers: followedById } });
            const followedUser = await userModel_1.default.findById(followedId);
            return followedUser;
        }
        catch (error) {
            console.log(error);
        }
    };
    const googleAuth = async (firstName, lastName, email, jti) => {
        try {
            const isExisting = await userModel_1.default.findOne({ email: email });
            if (!isExisting) {
                const newUser = new userModel_1.default({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    jti: jti
                });
                await newUser.save();
                return newUser;
            }
            else {
                return isExisting;
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    const unfollowTheUser = async (logedInUser, unfollowedId) => {
        try {
            await userModel_1.default.updateOne({ _id: logedInUser }, { $pull: { following: unfollowedId } });
            await userModel_1.default.updateOne({ _id: unfollowedId }, { $pull: { followers: logedInUser } });
            const unfollowedUser = await userModel_1.default.findById(unfollowedId);
            return unfollowedUser;
        }
        catch (error) {
            console.log(error);
        }
    };
    const checkEmailIsThere = async (email) => {
        try {
            const checkEmail = await userModel_1.default.findOne({ email });
            return checkEmail;
        }
        catch (error) {
            console.log(error);
        }
    };
    const changeThePassword = async (email, password) => {
        try {
            const user = await userModel_1.default.findOne({ email });
            if (user) {
                user.password = password;
                await user.save();
            }
            return true;
        }
        catch (error) {
            console.log(error);
        }
    };
    const getFollowingList = async (userId) => {
        try {
            const user = await userModel_1.default.findById(userId).populate('following', 'firstName lastName');
            const following = user?.following;
            return following;
        }
        catch (error) {
            console.log(error);
        }
    };
    const getFollowersList = async (userId) => {
        try {
            const user = await userModel_1.default.findById(userId).populate('followers', 'firstName lastName');
            const follwersList = user?.followers;
            return follwersList;
        }
        catch (error) {
            console.log(error);
        }
    };
    const getUserInfo = async (userId) => {
        try {
            const user = await userModel_1.default.findById(userId);
            return user;
        }
        catch (error) {
            console.log(error);
        }
    };
    const userSearch = async (userId, search) => {
        try {
            const keyword = search ? {
                $or: [
                    { firstName: { $regex: search, $options: 'i' } },
                    { lastName: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } }
                ]
            } : {};
            const users = await userModel_1.default.find({
                $and: [
                    {
                        $or: [
                            { firstName: { $regex: search, $options: 'i' } },
                            { lastName: { $regex: search, $options: 'i' } },
                            { email: { $regex: search, $options: 'i' } }
                        ]
                    },
                    { _id: { $ne: userId } },
                    { _id: { $in: (await userModel_1.default.findById(userId))?.following || [] } } // Filter by users followed by the current user
                ]
            })
                .select('firstName lastName');
            return users;
        }
        catch (error) {
            console.log(error);
        }
    };
    const getFavorites = async (userId) => {
        try {
            const favorites = await FavoriteModel_1.default.find({ user: userId }).populate('posts');
            return favorites;
        }
        catch (error) {
            console.error('Error fetching favorites:', error);
            throw error;
        }
    };
    const profileUpdate = async (user, userId) => {
        try {
            const updated = userModel_1.default.findByIdAndUpdate(userId, {
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image
            }, { new: true });
            return updated;
        }
        catch (error) {
            console.log(error);
        }
    };
    return {
        addUser,
        getUserByEmail,
        getAllUsers,
        blockUser,
        getSuggestion,
        followTheUser,
        googleAuth,
        unfollowTheUser,
        checkEmailIsThere,
        changeThePassword,
        getFollowingList,
        getFollowersList,
        getUserInfo,
        userSearch,
        getFavorites,
        profileUpdate
    };
};
exports.userRepositoryMongoDb = userRepositoryMongoDb;
