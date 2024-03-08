"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const auction_1 = require("../../application/usecases/auction/auction");
const razorPay_1 = require("../../utils/middleware/razorPay");
const auctionController = (auctionDbRepository, auctionDbRepositoryImpl) => {
    const dbRepositoryAuction = auctionDbRepository(auctionDbRepositoryImpl());
    const addAuction = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const data = req.body.data;
            const created = await (0, auction_1.addToAuction)(data, dbRepositoryAuction);
            res.json({
                created
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    const getUpcomingAuctions = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const upcomingAuctions = await (0, auction_1.getAuctionsUpcoming)(dbRepositoryAuction);
            res.json({
                upcomingAuctions
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    const isAuctioned = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const postId = req.params.postId;
            const auctioned = await (0, auction_1.checkAuctioned)(dbRepositoryAuction, postId);
            res.json({
                auctioned
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    const getAuctionDetails = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const auctionId = req.params.auctionId;
            const details = await (0, auction_1.getDetailsOfAuction)(dbRepositoryAuction, auctionId);
            res.json({
                details
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    const bid = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const userId = req.userId;
            const { auctionId, amount } = req.body;
            const auctionID = auctionId;
            const updated = await (0, auction_1.bidNow)(dbRepositoryAuction, userId, auctionID, amount);
            res.json({
                updated
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    const getMyListings = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const userId = req.userId;
            const listings = await (0, auction_1.getMyListing)(dbRepositoryAuction, userId);
            res.json({
                listings
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    const getAuctionId = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const postId = req.params.postId;
            const id = await (0, auction_1.getIdForAuction)(dbRepositoryAuction, postId);
            res.json({
                id
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    const removeAuction = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const id = req.params.auctionId;
            const removed = await (0, auction_1.auctionRemove)(dbRepositoryAuction, id);
            res.json({
                removed: true
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    const getMyBids = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const userId = req.userId;
            const myBids = await (0, auction_1.getBids)(dbRepositoryAuction, userId);
            res.json({
                myBids
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    const abortBid = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const userId = req.userId;
            const auctionId = req.params.id;
            const myBids = await (0, auction_1.bidAbort)(dbRepositoryAuction, userId, auctionId);
            res.json({
                myBids
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    const checkNotification = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const userId = req.userId;
            const created = await (0, auction_1.notification)(dbRepositoryAuction, userId);
            res.json({ created });
        }
        catch (error) {
            console.log(error);
        }
    });
    const changeRead = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const userId = req.userId;
            const updated = await (0, auction_1.readChange)(dbRepositoryAuction, userId);
            res.json({
                updated
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    const completedAuction = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const auctionId = req.params.id;
            const updated = await (0, auction_1.auctionCompleted)(dbRepositoryAuction, auctionId);
            res.json({
                updated
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    const payment = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const userId = req.userId;
            const auctionId = req.params.id;
            const paid = await (0, auction_1.paymentGateway)(dbRepositoryAuction, userId, auctionId);
            res.json({
                paid: paid?.order,
                paymentId: paid?.id,
                auctionId
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    const verifyPayment = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const details = req.body;
            const auctionId = req.body.auctionId;
            const userId = req.userId;
            const paymentId = req.body.paymentId;
            const response = await (0, razorPay_1.paymentVerify)(details);
            if (response) {
                const update = await (0, auction_1.updatePayment)(dbRepositoryAuction, userId, auctionId, paymentId);
                res.json({ update });
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    return {
        addAuction,
        getUpcomingAuctions,
        isAuctioned,
        getAuctionDetails,
        bid,
        getMyListings,
        getAuctionId,
        removeAuction,
        getMyBids,
        abortBid,
        checkNotification,
        changeRead,
        completedAuction,
        payment,
        verifyPayment
    };
};
exports.default = auctionController;
