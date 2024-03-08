"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productAdd = void 0;
const products_1 = require("../../../entities/products");
const productAdd = async (userId, product, productRepository) => {
    const { productName, description, age, condition, rarity, image } = product;
    const userID = userId;
    const productEntity = (0, products_1.productBeforeAuction)(productName, description, age, condition, rarity, image, userID);
    const createdProduct = await productRepository.addProduct(productEntity);
    return createdProduct;
};
exports.productAdd = productAdd;
