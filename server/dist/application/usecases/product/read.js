"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoriteRemove = exports.getFavorite = exports.addFavorite = exports.postReport = exports.addComments = exports.getComment = exports.postLike = exports.postEdit = exports.postDelete = exports.getPostDetail = exports.allPosts = exports.getUserProducts = void 0;
const products_1 = require("../../../entities/products");
const getUserProducts = async (productRepository, userId) => {
    const products = await productRepository.getUsersAllProducts(userId);
    return products;
};
exports.getUserProducts = getUserProducts;
const allPosts = async (productRepository, userId) => {
    const posts = await productRepository.getAllPosts(userId);
    return posts;
};
exports.allPosts = allPosts;
const getPostDetail = async (productRepository, postId) => {
    const post = await productRepository.getSinglePost(postId);
    return post;
};
exports.getPostDetail = getPostDetail;
const postDelete = async (productRepository, postId) => {
    const deleted = await productRepository.deletePost(postId);
    return deleted;
};
exports.postDelete = postDelete;
const postEdit = async (productRepository, post, postId) => {
    const { productName, description, age, condition, rarity } = post;
    const editPostEntity = (0, products_1.editPost)(productName, description, age, condition, rarity);
    const updated = await productRepository.editPost(editPostEntity, postId);
    return updated;
};
exports.postEdit = postEdit;
const postLike = async (productRepository, postId, userId) => {
    const liked = await productRepository.likePost(postId, userId);
    return liked;
};
exports.postLike = postLike;
const getComment = async (productRepository, postId) => {
    const comments = await productRepository.getComments(postId);
    return comments;
};
exports.getComment = getComment;
const addComments = async (productRepository, userId, postId, comment) => {
    const comments = await productRepository.addComment(userId, postId, comment);
    return comments;
};
exports.addComments = addComments;
const postReport = async (productRepository, userId, reportId, subject, issue) => {
    const reported = await productRepository.reportPost(userId, reportId, subject, issue);
    return reported;
};
exports.postReport = postReport;
const addFavorite = async (productRepository, userId, postId) => {
    const favorite = await productRepository.addToFavorites(userId, postId);
    return favorite;
};
exports.addFavorite = addFavorite;
const getFavorite = async (productRepository, userId) => {
    const favorite = await productRepository.getFavorites(userId);
    return favorite;
};
exports.getFavorite = getFavorite;
const favoriteRemove = async (productRepository, userId, postId) => {
    const favorite = await productRepository.removeFavorite(userId, postId);
    return favorite;
};
exports.favoriteRemove = favoriteRemove;
