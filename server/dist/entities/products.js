"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editPost = exports.productBeforeAuction = void 0;
function productBeforeAuction(productName, description, age, condition, rarity, image, userId) {
    return {
        getProductName: () => productName,
        getDescription: () => description,
        getAge: () => age,
        getCondition: () => condition,
        getRarity: () => rarity,
        getImage: () => image,
        getUserId: () => userId
    };
}
exports.productBeforeAuction = productBeforeAuction;
function editPost(productName, description, age, condition, rarity) {
    return {
        getProductName: () => productName,
        getDescription: () => description,
        getAge: () => age,
        getCondition: () => condition,
        getRarity: () => rarity
    };
}
exports.editPost = editPost;
