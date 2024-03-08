"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auctionRepositoryMongoDb = void 0;
const auctionModel_1 = __importDefault(require("../model/auctionModel"));
const productModel_1 = __importDefault(require("../model/productModel"));
const ParticipantsModel_1 = __importDefault(require("../model/ParticipantsModel"));
const userModel_1 = __importDefault(require("../model/userModel"));
const NotificationModel_1 = __importDefault(require("../model/NotificationModel"));
const PaymentModel_1 = __importDefault(require("../model/PaymentModel"));
const razorPay_1 = require("../../../utils/middleware/razorPay");
const moment_1 = __importDefault(require("moment"));
const auctionRepositoryMongoDb = () => {
    const notificationCheck = async (userID) => {
        try {
            const notificationsToSend = [];
            const auctions = await auctionModel_1.default.find({ endingDate: { $lt: new Date() } });
            for (const auction of auctions) {
                const participant = await ParticipantsModel_1.default.findOne({
                    currentAmount: auction.currentAmount,
                    userId: userID,
                    auctionId: auction._id,
                }).populate("userId");
                if (participant) {
                    const existingNotification = await NotificationModel_1.default.findOne({
                        reciever: participant.userId._id,
                        auctionId: auction._id,
                    });
                    if (!existingNotification) {
                        const notification = new NotificationModel_1.default({
                            reciever: participant.userId._id,
                            auctionId: auction._id,
                            message: "Congratulations, You got the Auction!!!",
                        });
                        const created = await notification.save();
                        if (created.reciever === userID) {
                            notificationsToSend.push(created);
                        }
                    }
                    else if (existingNotification) {
                        notificationsToSend.push(existingNotification);
                    }
                }
            }
            notificationsToSend.sort((a, b) => b.createdAt - a.createdAt);
            return notificationsToSend;
        }
        catch (error) {
            console.log(error);
        }
    };
    const addToAuction = async (auction) => {
        try {
            const postId = auction.getPostId();
            const currentAmount = auction.getCurrentAmount();
            const startingDate = auction.getStartingDate();
            const endingDate = new Date(startingDate);
            endingDate.setMinutes(endingDate.getMinutes() + 50); // Set endingDate to 2 minutes after startingDate
            const newAuction = new auctionModel_1.default({
                postId,
                startingAmount: currentAmount,
                currentAmount,
                startingDate,
                endingDate,
            });
            await newAuction.save();
            await productModel_1.default.findByIdAndUpdate(postId, { isAuctioned: true });
            return newAuction;
        }
        catch (error) {
            console.log(error);
        }
    };
    const getAuctionsUpcoming = async () => {
        try {
            const auctions = await auctionModel_1.default.find({
                isRemoved: false,
                isCompleted: false,
            })
                .populate({
                path: "postId",
                populate: {
                    path: "userId",
                    model: "User",
                    select: "firstName lastName",
                },
                select: "productName description image",
            })
                .exec();
            return auctions;
        }
        catch (error) {
            console.error("Error fetching upcoming auctions:", error);
            throw error;
        }
    };
    const isAuctioned = async (postId) => {
        try {
            const auctioned = await productModel_1.default.findById(postId, { isAuctioned });
            return auctioned;
        }
        catch (error) {
            console.log(error);
        }
    };
    const getDetailsOfAuction = async (auctionId) => {
        try {
            let populateOptions = [
                {
                    path: "postId",
                    select: "productName image",
                }
            ];
            const auction = await auctionModel_1.default.findById(auctionId);
            if (auction?.currentBidder) {
                populateOptions.push({
                    path: "currentBidder",
                    select: "firstName lastName",
                });
            }
            const details = await auctionModel_1.default.findById(auctionId)
                .populate(populateOptions);
            return details;
        }
        catch (error) {
            console.log(error);
        }
    };
    const bidNow = async (userId, auctionId, amount) => {
        try {
            let newParticipant;
            let existingParticipant;
            const auction = await auctionModel_1.default.findByIdAndUpdate(auctionId, {
                $inc: { currentAmount: amount },
                $set: { currentBidder: userId }
            }, { new: true });
            if (!auction) {
                return null;
            }
            existingParticipant = await ParticipantsModel_1.default.findOne({ userId, auctionId });
            if (existingParticipant) {
                existingParticipant.currentAmount = auction.currentAmount;
                await existingParticipant.save();
            }
            else {
                newParticipant = new ParticipantsModel_1.default({
                    currentAmount: auction.currentAmount,
                    userId,
                    auctionId: auction._id,
                });
                await newParticipant.save();
            }
            const isParticipantInAuction = auction.participants.includes(existingParticipant ? existingParticipant._id : newParticipant?._id);
            if (!isParticipantInAuction) {
                await auctionModel_1.default.findByIdAndUpdate(auctionId, {
                    $push: {
                        participants: existingParticipant
                            ? existingParticipant._id
                            : newParticipant?._id,
                    },
                }, { new: true });
            }
            const details = await auctionModel_1.default.findById(auctionId)
                .populate({
                path: "postId",
                select: "productName image",
            })
                .populate({
                path: "currentBidder",
                select: "firstName lastName",
            });
            return details;
        }
        catch (error) {
            console.log(error);
        }
    };
    const getMyListing = async (userId) => {
        try {
            const products = await productModel_1.default.find({ userId: userId });
            const productIds = products.map((product) => product._id);
            const auctions = await auctionModel_1.default.find({
                $and: [{ postId: { $in: productIds } }, { isRemoved: false }],
            }).populate({
                path: "postId",
                populate: {
                    path: "userId",
                },
            });
            return auctions;
        }
        catch (error) {
            console.error("Error fetching auctions:", error);
            throw error;
        }
    };
    const getIdForAuction = async (postId) => {
        try {
            const auction = await auctionModel_1.default.findOne({ postId });
            return auction?._id;
        }
        catch (error) {
            console.log(error);
        }
    };
    const auctionRemove = async (id) => {
        try {
            const removed = await auctionModel_1.default.findByIdAndUpdate(id, { isRemoved: true });
            if (removed) {
                return true;
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    const getBids = async (userId) => {
        try {
            const myBids = await ParticipantsModel_1.default.find({ userId })
                .populate({
                path: "auctionId",
                match: { isRemoved: false },
                populate: [
                    {
                        path: "postId",
                        model: "Product",
                    },
                    {
                        path: "winner",
                        model: "User",
                    },
                ],
            })
                .exec();
            const filteredBids = myBids.filter((bid) => bid.auctionId !== null);
            return filteredBids;
        }
        catch (error) {
            console.log(error);
        }
    };
    const bidAbort = async (userId, participantId) => {
        try {
            const removedParticipant = await ParticipantsModel_1.default.findOneAndDelete({
                _id: participantId,
            });
            if (!removedParticipant) {
                throw new Error("Participant not found.");
            }
            const updatedAuction = await auctionModel_1.default.findOneAndUpdate({ participants: participantId }, { $pull: { participants: participantId } }, { new: true });
            if (!updatedAuction) {
                throw new Error("Auction not found.");
            }
            return updatedAuction;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    };
    const blockAuction = async (auctionId) => {
        try {
            const auction = await auctionModel_1.default.findById(auctionId);
            if (!auction) {
                throw new Error("Auction not found");
            }
            const updatedAuction = await auctionModel_1.default.findByIdAndUpdate(auctionId, { isBlocked: !auction.isBlocked }, { new: true });
            return updatedAuction;
        }
        catch (error) {
            console.log(error);
        }
    };
    const readChange = async (userId) => {
        try {
            const changed = await NotificationModel_1.default.find({ reciever: userId }).exec();
            for (let notification of changed) {
                notification.isRead = true;
                await notification.save();
            }
            const updated = await NotificationModel_1.default.find({ reciever: userId }).populate({
                path: "auctionId",
                match: { isRemoved: false },
                populate: {
                    path: "postId",
                    model: "Product",
                },
            });
            return updated;
        }
        catch (error) {
            console.log(error);
        }
    };
    const auctionCompleted = async (auctionId) => {
        try {
            const auction = await auctionModel_1.default.findByIdAndUpdate(auctionId, { isCompleted: true }, { new: true });
            const winner = await ParticipantsModel_1.default.findOne({
                currentAmount: auction?.currentAmount,
                auctionId: auction?._id,
            });
            const updated = await auctionModel_1.default.findByIdAndUpdate(auctionId, { winner: winner?.userId }, { new: true }).populate({
                path: "postId",
                select: "productName image",
            });
            return updated;
        }
        catch (error) {
            console.log(error);
        }
    };
    const paymentGateway = async (userId, auctionId) => {
        try {
            const auction = await auctionModel_1.default.findById(auctionId).populate("postId");
            const startinPrice = auction?.startingAmount;
            const endingPrice = auction?.currentAmount;
            if (startinPrice && endingPrice) {
                const difference = endingPrice - startinPrice;
                const adminProfit = 0.1 * difference;
                const payment = new PaymentModel_1.default({
                    auctionId: auction._id,
                    amount: adminProfit,
                    payer: userId,
                    auctioner: auction.postId?.userId,
                });
                await payment.save();
                return (0, razorPay_1.generareRazorpay)(payment._id, payment.amount);
            }
        }
        catch (error) {
            console.error("Error processing payment:", error);
        }
    };
    const updatePayment = async (userId, auctionId, paymentId) => {
        try {
            const updated = await PaymentModel_1.default.findByIdAndUpdate(paymentId, { isPaid: true }, { new: true }).populate("auctionId");
            const auction = await auctionModel_1.default.findByIdAndUpdate(auctionId, {
                isPaid: true,
            }, { new: true }).populate("postId");
            return auction;
        }
        catch (error) {
            console.log(error);
        }
    };
    const getIncome = async () => {
        try {
            const incomes = await PaymentModel_1.default.find().populate({
                path: "auctionId",
                match: { isPaid: true },
                populate: {
                    path: "postId",
                    model: "Product",
                },
            });
            return incomes;
        }
        catch (error) {
            console.log(error);
        }
    };
    const approveAuction = async (paymentId) => {
        try {
            const update = await PaymentModel_1.default.findByIdAndUpdate(paymentId, { isConfirmed: true }, { new: true });
            const updated = await PaymentModel_1.default.find().populate({
                path: 'auctionId',
                populate: {
                    path: 'postId',
                    model: 'Product'
                }
            });
            if (update) {
                const auctionerId = update.auctioner;
                const payerId = update.payer;
                const [auctioner, payer] = await Promise.all([
                    userModel_1.default.findById(auctionerId),
                    userModel_1.default.findById(payerId)
                ]);
                if (auctioner && payer) {
                    const auctionerEmail = auctioner.email;
                    const payerEmail = payer.email;
                    return { auctionerEmail, payerEmail, updated };
                }
                else {
                    console.log("User not found");
                }
            }
            else {
                console.log("Payment not found");
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    const paymentsData = async () => {
        const auctions = await auctionModel_1.default.find({ isCompleted: true });
        const payments = await PaymentModel_1.default.find({ isPaid: true });
        const auctionCountByWeek = {};
        auctions.forEach(auction => {
            const weekNumber = (0, moment_1.default)(auction.createdOn).isoWeek();
            if (!auctionCountByWeek[weekNumber]) {
                auctionCountByWeek[weekNumber] = 1;
            }
            else {
                auctionCountByWeek[weekNumber]++;
            }
        });
        return Object.values(auctionCountByWeek);
    };
    return {
        addToAuction,
        getAuctionsUpcoming,
        isAuctioned,
        getDetailsOfAuction,
        bidNow,
        getMyListing,
        getIdForAuction,
        auctionRemove,
        getBids,
        bidAbort,
        notificationCheck,
        blockAuction,
        readChange,
        auctionCompleted,
        paymentGateway,
        updatePayment,
        getIncome,
        approveAuction,
        paymentsData
    };
};
exports.auctionRepositoryMongoDb = auctionRepositoryMongoDb;
