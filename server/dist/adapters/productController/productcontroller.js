"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const addProduct_1 = require("../../application/usecases/product/addProduct");
const read_1 = require("../../application/usecases/product/read");
const productController = (productDbRepository, productDbRepositoryImpl) => {
    const dbRepositoryProduct = productDbRepository(productDbRepositoryImpl());
    const addProduct = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const product = req.body.data;
            console.log(req.body.data);
            const userId = req.userId;
            if (userId !== undefined) {
                const createdProduct = await (0, addProduct_1.productAdd)(userId, product, dbRepositoryProduct);
            }
            res.json({
                status: 'success',
                message: 'product added'
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    const handleGetProductsOfUser = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const userId = req.params.userId;
            let myProducts;
            if (userId) {
                myProducts = await (0, read_1.getUserProducts)(dbRepositoryProduct, userId);
            }
            res.json({
                myProducts
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    const getAllPosts = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const userId = req.userId;
            let posts;
            if (userId) {
                posts = await (0, read_1.allPosts)(dbRepositoryProduct, userId);
            }
            res.json({
                posts
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    const getPostDetails = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const postId = req.params.postId;
            const details = await (0, read_1.getPostDetail)(dbRepositoryProduct, postId);
            res.json(details);
        }
        catch (error) {
            console.log(error);
        }
    });
    const deletePost = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const postId = req.params.postId;
            const isDeleted = await (0, read_1.postDelete)(dbRepositoryProduct, postId);
            if (isDeleted) {
                res.json({
                    message: "Deleted successfully"
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    const editPost = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const post = req.body.data;
            const postId = req.params.postId;
            const updated = await (0, read_1.postEdit)(dbRepositoryProduct, post, postId);
            if (updated) {
                res.json({
                    updated
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    const likePost = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const postId = req.params.postId;
            const userId = req.userId;
            const updated = await (0, read_1.postLike)(dbRepositoryProduct, postId, userId);
            res.json({
                updated
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    const getComments = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const postId = req.params.postId;
            const comments = await (0, read_1.getComment)(dbRepositoryProduct, postId);
            res.json({
                comments
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    const addComment = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const postId = req.params.postId;
            const { comment } = req.body;
            const userId = req.userId;
            const commented = await (0, read_1.addComments)(dbRepositoryProduct, userId, postId, comment);
            res.json({
                commented
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    const reportPost = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const { reportId, issue, subject } = req.body.data;
            const userId = req.userId;
            const reported = await (0, read_1.postReport)(dbRepositoryProduct, userId, reportId, subject, issue);
            if (!reported) {
                res.json({
                    success: false,
                    message: "Already Reported"
                });
            }
            else {
                res.json({
                    success: true,
                    message: "Reported successfully"
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    const addToFavorite = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const userId = req.userId;
            const postId = req.body.postId;
            const favorite = await (0, read_1.addFavorite)(dbRepositoryProduct, userId, postId);
            if (favorite) {
                res.json({
                    message: 'Added to favorites'
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    const getFavorites = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const userId = req.userId;
            const favorites = await (0, read_1.getFavorite)(dbRepositoryProduct, userId);
            res.json({
                favorites
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    const removeFavorite = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const userId = req.userId;
            const postId = req.params.id;
            const favorites = await (0, read_1.favoriteRemove)(dbRepositoryProduct, userId, postId);
            res.json({
                favorites
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    return {
        addProduct,
        handleGetProductsOfUser,
        getAllPosts,
        getPostDetails,
        deletePost,
        editPost,
        likePost,
        getComments,
        addComment,
        reportPost,
        addToFavorite,
        getFavorites,
        removeFavorite
    };
};
exports.default = productController;
