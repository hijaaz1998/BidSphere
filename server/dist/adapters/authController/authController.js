"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userAuth_1 = require("../../application/usecases/auth/userAuth");
const appError_1 = __importDefault(require("../../utils/middleware/appError"));
const jwt_decode_1 = require("jwt-decode");
const nodemailer_1 = __importDefault(require("nodemailer"));
const generateOTP_1 = require("../../utils/middleware/generateOTP");
let otp;
let RegisterOtp;
const authController = (authServiceInterface, authServiceImpl, userDbRepository, userDbRepositoryImpl) => {
    const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
    const authService = authServiceInterface(authServiceImpl());
    const registerUser = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const user = req.body;
            const result = await (0, userAuth_1.userRegister)(user, dbRepositoryUser, authService);
            if (result instanceof appError_1.default) {
                res.json({
                    success: false,
                    result: {
                        error: {
                            message: result.message,
                            status: result.status,
                        },
                    },
                });
            }
            else {
                const { token, createdUser } = result;
                res.json({
                    success: true,
                    message: 'User Registered',
                    result: {
                        token,
                        createdUser,
                    },
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    const updatProfile = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const userId = req.userId;
            const data = req.body;
            const updated = await (0, userAuth_1.profileUpdate)(dbRepositoryUser, data, userId);
            res.json({ updated });
        }
        catch (error) {
            console.log(error);
        }
    });
    const getOtpForRegister = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            RegisterOtp = (0, generateOTP_1.generateOtp)();
            const emailObject = req.body;
            const email = Object.keys(emailObject)[0];
            const transporter = nodemailer_1.default.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 587,
                auth: {
                    user: 'muhammadijasbtc@gmail.com',
                    pass: 'lcui urmh witl gaah'
                }
            });
            const mailOptions = {
                from: 'test@wristcrafts.com',
                to: email,
                subject: "Your OTP",
                text: `Your OTP is ${RegisterOtp}`
            };
            transporter.sendMail(mailOptions, (error) => {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Email sent:');
                    console.log(RegisterOtp);
                    res.json({
                        success: true,
                        otp: RegisterOtp,
                        message: "Otp has been sent"
                    });
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    const getOtp = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const emailObject = req.body;
            const email = Object.keys(emailObject)[0];
            otp = (0, generateOTP_1.generateOtp)();
            const checkData = await (0, userAuth_1.checkEmail)(dbRepositoryUser, email);
            if (!checkData) {
                res.json({
                    success: false,
                    message: "Please check the mail you entered"
                });
            }
            else {
                console.log(otp);
                const transporter = nodemailer_1.default.createTransport({
                    service: 'gmail',
                    host: 'smtp.gmail.com',
                    port: 587,
                    auth: {
                        user: 'muhammadijasbtc@gmail.com',
                        pass: 'lcui urmh witl gaah'
                    }
                });
                const mailOptions = {
                    from: 'test@wristcrafts.com',
                    to: email,
                    subject: "Your OTP",
                    text: `Your OTP is ${otp}`
                };
                transporter.sendMail(mailOptions, (error) => {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log('Email sent:');
                        console.log(otp);
                        res.json({
                            success: true,
                            otp: otp,
                            message: "Otp has been sent"
                        });
                    }
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    const loginUser = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const { email, password } = req.body;
            const result = await (0, userAuth_1.userLogin)(email, password, dbRepositoryUser, authService);
            if (result instanceof appError_1.default) {
                res.json({
                    status: false,
                    result: {
                        error: {
                            message: result.message,
                            status: result.status,
                        },
                    },
                });
            }
            else {
                res.json({
                    status: true,
                    message: "user retrieved",
                    result: {
                        token: result.token,
                        user: result.userDetails,
                    },
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    const getSuggestion = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const userId = req.userId;
            const suggestions = await (0, userAuth_1.getUserSuggestion)(dbRepositoryUser, userId);
            res.json({
                suggestions: suggestions
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    const followUser = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const followed = req.params.followed;
            const userId = req.userId;
            let isFollowed;
            if (userId) {
                isFollowed = await (0, userAuth_1.followTheUser)(dbRepositoryUser, followed, userId);
            }
            if (isFollowed) {
                res.json({
                    isFollowed
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    const googleAuth = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const tokenObject = JSON.stringify(req.body);
            const token = tokenObject;
            const decoded = (0, jwt_decode_1.jwtDecode)(token);
            const firstName = decoded.given_name;
            const lastName = decoded.family_name;
            const jti = decoded.jti;
            const email = decoded.email;
            const result = await (0, userAuth_1.googleAuthRegister)(firstName, lastName, email, jti, dbRepositoryUser, authService);
            if (result) {
                res.json(result);
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    const unfollow = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const logedInUser = req.userId;
            const unfollowedId = req.params.unfollowedId;
            const isUnfollowed = await (0, userAuth_1.unfollowTheUser)(dbRepositoryUser, logedInUser, unfollowedId);
            if (isUnfollowed) {
                res.json({
                    isUnfollowed
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    const changePassword = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const { email, password } = req.body;
            const response = await (0, userAuth_1.changeThePassword)(dbRepositoryUser, authService, email, password);
            res.json({
                response
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    const getFollowing = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const userId = req.params.userId;
            const following = await (0, userAuth_1.getFollowingList)(dbRepositoryUser, userId);
            res.json({
                following
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    const getFollowers = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const userId = req.params.userId;
            const followers = await (0, userAuth_1.getFollowersList)(dbRepositoryUser, userId);
            res.json({
                followers
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    const getUserInfos = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const userId = req.params.userId;
            const user = await (0, userAuth_1.getUserInfo)(dbRepositoryUser, userId);
            res.json({
                user
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    const searchUser = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const userId = req.userId;
            const search = req.query.search;
            const results = await (0, userAuth_1.userSearch)(dbRepositoryUser, userId, search);
            res.json({
                results
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    const getFavorite = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const userid = req.params.userId;
            const favorites = await (0, userAuth_1.getFavorites)(dbRepositoryUser, userid);
            res.json({
                favorites
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    return {
        registerUser,
        loginUser,
        getSuggestion,
        followUser,
        googleAuth,
        unfollow,
        getOtp,
        changePassword,
        getFollowing,
        getFollowers,
        getUserInfos,
        getOtpForRegister,
        searchUser,
        getFavorite,
        updatProfile
    };
};
exports.default = authController;
