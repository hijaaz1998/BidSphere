"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auction = void 0;
function auction(postId, currentAmount, startingDate) {
    return {
        getPostId: () => postId,
        getCurrentAmount: () => currentAmount,
        getStartingDate: () => startingDate
    };
}
exports.auction = auction;
