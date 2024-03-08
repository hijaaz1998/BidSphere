"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePayment = exports.paymentGateway = exports.auctionCompleted = exports.readChange = exports.notification = exports.bidAbort = exports.getBids = exports.auctionRemove = exports.getIdForAuction = exports.getMyListing = exports.bidNow = exports.getDetailsOfAuction = exports.checkAuctioned = exports.getAuctionsUpcoming = exports.addToAuction = void 0;
const auction_1 = require("../../../entities/auction");
const addToAuction = async (data, auctionRepository) => {
    const { postId, auctionDate, basePrice } = data;
    const auctionEntity = (0, auction_1.auction)(postId, basePrice, auctionDate);
    const createdAuction = await auctionRepository.addAuction(auctionEntity);
    return createdAuction;
};
exports.addToAuction = addToAuction;
const getAuctionsUpcoming = async (auctionRepository) => {
    const auctions = await auctionRepository.getUpcomingAuctions();
    return auctions;
};
exports.getAuctionsUpcoming = getAuctionsUpcoming;
const checkAuctioned = async (auctionRepository, postId) => {
    const isAuctioned = await auctionRepository.isOnAuction(postId);
    return isAuctioned;
};
exports.checkAuctioned = checkAuctioned;
const getDetailsOfAuction = async (auctionRepository, auctionId) => {
    const details = await auctionRepository.getAuctionDetails(auctionId);
    return details;
};
exports.getDetailsOfAuction = getDetailsOfAuction;
const bidNow = async (auctionRepository, userId, auctionId, amount) => {
    const updated = await auctionRepository.bidPost(userId, auctionId, amount);
    return updated;
};
exports.bidNow = bidNow;
const getMyListing = async (auctionRepository, userId) => {
    const listings = await auctionRepository.getMyListings(userId);
    return listings;
};
exports.getMyListing = getMyListing;
const getIdForAuction = async (auctionRepository, postId) => {
    const id = await auctionRepository.getAuctionId(postId);
    return id;
};
exports.getIdForAuction = getIdForAuction;
const auctionRemove = async (auctionRepository, id) => {
    const removed = await auctionRepository.removeAuction(id);
    return removed;
};
exports.auctionRemove = auctionRemove;
const getBids = async (auctionRepository, userId) => {
    const bids = await auctionRepository.getMyBids(userId);
    return bids;
};
exports.getBids = getBids;
const bidAbort = async (auctionRepository, userId, auctionId) => {
    const bids = await auctionRepository.abortBid(userId, auctionId);
    return bids;
};
exports.bidAbort = bidAbort;
const notification = async (auctionRepository, userId) => {
    const created = await auctionRepository.createNotification(userId);
    return created;
};
exports.notification = notification;
const readChange = async (auctionRepository, userId) => {
    const changed = await auctionRepository.changeRead(userId);
    return changed;
};
exports.readChange = readChange;
const auctionCompleted = async (auctionRepository, auctionId) => {
    const updated = await auctionRepository.completedAuction(auctionId);
    return updated;
};
exports.auctionCompleted = auctionCompleted;
const paymentGateway = async (auctionRepository, userId, auctionId) => {
    const paid = await auctionRepository.payment(userId, auctionId);
    return paid;
};
exports.paymentGateway = paymentGateway;
const updatePayment = async (auctionRepository, userId, auctionId, paymentId) => {
    const updated = await auctionRepository.paymentUpdate(userId, auctionId, paymentId);
    return updated;
};
exports.updatePayment = updatePayment;
