"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const adminAuth_1 = require("../../application/usecases/adminAuth/adminAuth");
const read_1 = require("../../application/usecases/user/read");
const read_2 = require("../../application/usecases/user/read");
const nodemailer_1 = __importDefault(require("nodemailer"));
const adminAuthController = (authServiceInterface, authServiceImpl, userDbRepository, userDbRepositoryImpl, auctionDbRepository, auctionDbRepositoryImpl, productDbRepository, productDbRepositoryImpl) => {
    const authService = authServiceInterface(authServiceImpl());
    const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
    const dbRepositoryAuction = auctionDbRepository(auctionDbRepositoryImpl());
    const dbRepositoryProduct = productDbRepository(productDbRepositoryImpl());
    const loginAdmin = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const { email, password } = req.body;
            const adminToken = await (0, adminAuth_1.adminLogin)(email, password, authService);
            res.json({
                status: "success",
                message: "admin logined",
                adminToken
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    const getAllUsers = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const result = await (0, read_1.getUsers)(dbRepositoryUser);
            res.json({
                result
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    const blockUser = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const userId = req.params.userId;
            const isBlocked = await (0, read_2.blockUsers)(userId, dbRepositoryUser);
            res.json({
                message: "success"
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    const getAuctions = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const auctions = await dbRepositoryAuction.getUpcomingAuctions();
            res.json({
                auctions
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    const getPosts = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const posts = await dbRepositoryProduct.getAllPostsAdmin();
            res.json({
                posts
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    const blockAuction = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const auctionId = req.params.id;
            const blocked = await dbRepositoryAuction.auctionBlock(auctionId);
            res.json({
                blocked
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    const getReports = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const reports = await dbRepositoryProduct.fetchReports();
            res.json({ reports });
        }
        catch (error) {
            console.log(error);
        }
    });
    const getIncome = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const incomes = await dbRepositoryAuction.getIncomes();
            res.json({ incomes });
        }
        catch (error) {
            console.log(error);
        }
    });
    const approveAuction = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const paymentId = req.params.paymentId;
            const approved = await dbRepositoryAuction.auctionApprove(paymentId);
            const payerEmail = approved?.payerEmail;
            const auctionerEmail = approved?.auctionerEmail;
            const updated = approved?.updated;
            if (approved) {
                const transporter = nodemailer_1.default.createTransport({
                    service: 'gmail',
                    host: 'smtp.gmail.com',
                    port: 587,
                    auth: {
                        user: 'muhammadijasbtc@gmail.com',
                        pass: 'lcui urmh witl gaah'
                    }
                });
                // Send email to the payer
                const payerMailOptions = {
                    from: 'test@wristcrafts.com',
                    to: payerEmail,
                    subject: "Auction Success",
                    text: `Your auction has been successful and approved. Now you can contact with the auctioner using the email: ${auctionerEmail}`
                };
                // Send email to the auctioner
                const auctionerMailOptions = {
                    from: 'test@wristcrafts.com',
                    to: auctionerEmail,
                    subject: "Auction Success",
                    text: `Your auction has been successful and approved. Now you can chat with the final bidder using the email: ${payerEmail}`
                };
                // Send email to the payer
                transporter.sendMail(payerMailOptions, (error) => {
                    if (error) {
                        console.log("Error sending email to payer:", error);
                    }
                    else {
                        console.log('Email sent to payer:', approved.payerEmail);
                    }
                });
                // Send email to the auctioner
                transporter.sendMail(auctionerMailOptions, (error) => {
                    if (error) {
                        console.log("Error sending email to auctioner:", error);
                    }
                    else {
                        console.log('Email sent to auctioner:', approved.auctionerEmail);
                    }
                });
                res.json({
                    message: 'Email have been sent',
                    updated
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    const dashboard = (0, express_async_handler_1.default)(async (req, res) => {
        const payments = await dbRepositoryAuction.getPayments();
        res.json({ payments });
    });
    return {
        loginAdmin,
        getAllUsers,
        blockUser,
        getAuctions,
        getPosts,
        blockAuction,
        getReports,
        getIncome,
        approveAuction,
        dashboard
    };
};
exports.default = adminAuthController;
