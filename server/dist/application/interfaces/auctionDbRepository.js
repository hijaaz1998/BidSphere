"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auctionDbRepository = void 0;
const auctionDbRepository = (repository) => {
    const addAuction = async (auction) => {
        return await repository.addToAuction(auction);
    };
    const getUpcomingAuctions = async () => {
        return await repository.getAuctionsUpcoming();
    };
    const isOnAuction = async (postId) => {
        return await repository.isAuctioned(postId);
    };
    const getAuctionDetails = async (auctionId) => {
        return await repository.getDetailsOfAuction(auctionId);
    };
    const bidPost = async (userId, auctionId, amount) => {
        return await repository.bidNow(userId, auctionId, amount);
    };
    const getMyListings = async (userId) => {
        return await repository.getMyListing(userId);
    };
    const getAuctionId = async (postId) => {
        return await repository.getIdForAuction(postId);
    };
    const removeAuction = async (id) => {
        return await repository.auctionRemove(id);
    };
    const getMyBids = async (userId) => {
        return await repository.getBids(userId);
    };
    const abortBid = async (userId, auctionId) => {
        return await repository.bidAbort(userId, auctionId);
    };
    const createNotification = async (userId) => {
        return await repository.notificationCheck(userId);
    };
    const auctionBlock = async (auctionId) => {
        return await repository.blockAuction(auctionId);
    };
    const changeRead = async (userId) => {
        return await repository.readChange(userId);
    };
    const completedAuction = async (auctionId) => {
        return await repository.auctionCompleted(auctionId);
    };
    const payment = async (userId, auctionId) => {
        return await repository.paymentGateway(userId, auctionId);
    };
    const paymentUpdate = async (userId, auctionId, paymentId) => {
        return await repository.updatePayment(userId, auctionId, paymentId);
    };
    const getIncomes = async () => {
        return await repository.getIncome();
    };
    const auctionApprove = async (paymentId) => {
        return await repository.approveAuction(paymentId);
    };
    const getPayments = async () => {
        return await repository.paymentsData();
    };
    return {
        addAuction,
        getUpcomingAuctions,
        isOnAuction,
        getAuctionDetails,
        bidPost,
        getMyListings,
        getAuctionId,
        removeAuction,
        getMyBids,
        abortBid,
        createNotification,
        auctionBlock,
        changeRead,
        completedAuction,
        payment,
        paymentUpdate,
        getIncomes,
        auctionApprove,
        getPayments
    };
};
exports.auctionDbRepository = auctionDbRepository;
