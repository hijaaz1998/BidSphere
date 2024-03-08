"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productDbRepository = void 0;
const productDbRepository = (repository) => {
    const addProduct = async (product) => {
        return await repository.addProductBefore(product);
    };
    const getUsersAllProducts = async (userId) => {
        return await repository.getUserProducts(userId);
    };
    const getAllPosts = async (userId) => {
        return await repository.allPosts(userId);
    };
    const getSinglePost = async (postId) => {
        return await repository.getPostDetails(postId);
    };
    const deletePost = async (postId) => {
        return await repository.postDelete(postId);
    };
    const editPost = async (post, postId) => {
        return await repository.postEdit(post, postId);
    };
    const likePost = async (postId, userId) => {
        return await repository.postLike(postId, userId);
    };
    const getComments = async (postId) => {
        return await repository.getComment(postId);
    };
    const addComment = async (userId, postId, comment) => {
        return await repository.addComments(userId, postId, comment);
    };
    const getAllPostsAdmin = async () => {
        return await repository.getPostsAdmin();
    };
    const reportPost = async (userId, reportId, subject, issue) => {
        return await repository.postReport(userId, reportId, subject, issue);
    };
    const addToFavorites = async (userId, postId) => {
        return await repository.addFavorite(userId, postId);
    };
    const getFavorites = async (userId) => {
        return await repository.getFavorite(userId);
    };
    const removeFavorite = async (userId, postId) => {
        return await repository.favoriteRemove(userId, postId);
    };
    const fetchReports = async () => {
        return await repository.getReports();
    };
    return {
        addProduct,
        getUsersAllProducts,
        getAllPosts,
        getSinglePost,
        deletePost,
        editPost,
        likePost,
        getComments,
        addComment,
        getAllPostsAdmin,
        reportPost,
        addToFavorites,
        getFavorites,
        removeFavorite,
        fetchReports
    };
};
exports.productDbRepository = productDbRepository;
