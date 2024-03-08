"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRepositoryMongoDb = void 0;
const productModel_1 = __importDefault(require("../model/productModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = __importDefault(require("../model/userModel"));
const IncidentModel_1 = __importDefault(require("../model/IncidentModel"));
const FavoriteModel_1 = __importDefault(require("../model/FavoriteModel"));
const productRepositoryMongoDb = () => {
    const addProductBefore = async (product) => {
        try {
            const newProduct = new productModel_1.default({
                productName: product.getProductName(),
                description: product.getDescription(),
                age: product.getAge(),
                condition: product.getCondition(),
                rarity: product.getRarity(),
                image: product.getImage(),
                userId: product.getUserId()
            });
            await newProduct.save();
            return newProduct;
        }
        catch (error) {
            console.log(error);
        }
    };
    const getUserProducts = async (userId) => {
        try {
            const products = await productModel_1.default.find({ userId: userId, isDeleted: false }).lean();
            return products;
        }
        catch (error) {
            console.log(error);
        }
    };
    const allPosts = async (userId) => {
        try {
            const user = await userModel_1.default.findById(userId);
            let followingIds;
            if (user) {
                followingIds = user.following.map(followedUser => followedUser.toString());
            }
            const posts = await productModel_1.default.find({ userId: { $in: followingIds }, isDeleted: false, isBlocked: false })
                .sort({ createdOn: -1 })
                .populate('userId', 'firstName lastName image');
            return posts;
        }
        catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    };
    const getPostDetails = async (postId) => {
        try {
            const post = await productModel_1.default.findById(postId).populate('userId');
            return post;
        }
        catch (error) {
            console.log(error);
        }
    };
    const postDelete = async (postId) => {
        try {
            await productModel_1.default.findByIdAndUpdate(postId, { isDeleted: true });
            return true;
        }
        catch (error) {
            console.log(error);
        }
    };
    const postEdit = async (post, postId) => {
        try {
            const updatedProduct = await productModel_1.default.findOneAndUpdate({ _id: postId }, {
                productName: post.getProductName(),
                description: post.getDescription(),
                age: post.getAge(),
                condition: post.getCondition(),
                rarity: post.getRarity(),
            }, { new: true });
            if (updatedProduct) {
                return updatedProduct;
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    const postLike = async (postId, userId) => {
        try {
            const existingPost = await productModel_1.default.findById(postId);
            if (!existingPost) {
                return null;
            }
            const likedByUser = existingPost.likes.some((like) => like?.user?.toString() === userId);
            let updated;
            if (likedByUser) {
                updated = await productModel_1.default.findByIdAndUpdate(postId, {
                    $pull: { likes: { user: userId } },
                }, { new: true });
            }
            else {
                updated = await productModel_1.default.findByIdAndUpdate(postId, {
                    $addToSet: { likes: { user: userId } },
                }, { new: true });
            }
            if (updated) {
                return updated;
            }
        }
        catch (error) {
            console.error("Error updating likes:", error);
            return null;
        }
    };
    const getComment = async (postId) => {
        try {
            const product = await productModel_1.default.aggregate([
                { $match: { _id: new mongoose_1.default.Types.ObjectId(postId) } },
                {
                    $unwind: "$comments",
                },
                {
                    $sort: { "comments.createdOn": -1 },
                },
                {
                    $limit: 5,
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "comments.user",
                        foreignField: "_id",
                        as: "user",
                    },
                },
                {
                    $unwind: "$user",
                },
                {
                    $project: {
                        _id: 0,
                        commentText: "$comments.comment",
                        user: { firstName: "$user.firstName", lastName: "$user.lastName" },
                    },
                },
            ]);
            return product;
        }
        catch (error) {
            console.error("Error getting comments with users:", error);
            throw error;
        }
    };
    const addComments = async (userId, postId, comment) => {
        try {
            const product = await productModel_1.default.findById(postId);
            if (!product) {
                console.error('Product not found');
                return;
            }
            const newComment = {
                user: userId,
                comment: comment,
            };
            product.comments.push(newComment);
            await product.save();
            return product;
        }
        catch (error) {
            console.error('Error adding comment:', error);
        }
    };
    const getPostsAdmin = async () => {
        try {
            const posts = await productModel_1.default.find({ isDeleted: false })
                .populate({
                path: 'userId',
                model: 'User',
                select: 'firstName lastName email',
            })
                .exec();
            return posts;
        }
        catch (error) {
            console.log(error);
        }
    };
    const postReport = async (userId, reportId, subject, issue) => {
        try {
            const existing = await IncidentModel_1.default.findOne({ reportedUser: userId });
            if (existing) {
                return false;
            }
            const newIncident = new IncidentModel_1.default({
                subject,
                issue,
                reportedUser: userId,
                ReportedPost: reportId
            });
            const updated = await productModel_1.default.findByIdAndUpdate(reportId, { $inc: { reportCount: 1 } }, { new: true });
            if (updated && updated.reportCount >= 5) {
                await productModel_1.default.findByIdAndUpdate(reportId, { isBlocked: true });
            }
            const saved = await newIncident.save();
            return saved;
        }
        catch (error) {
            console.log(error);
        }
    };
    const addFavorite = async (userId, postId) => {
        try {
            let favorite;
            const existingFavorite = await FavoriteModel_1.default.findOne({
                user: userId,
                posts: { $in: [postId] }
            });
            if (!existingFavorite) {
                favorite = await FavoriteModel_1.default.findOneAndUpdate({ user: userId }, { $push: { posts: postId } }, { new: true, upsert: true });
            }
            else {
                favorite = existingFavorite;
            }
            return favorite;
        }
        catch (error) {
            console.log(error);
        }
    };
    const getFavorite = async (userId) => {
        try {
            const products = await FavoriteModel_1.default.findOne({ user: userId }).populate('posts');
            const favorites = products ? products.posts : [];
            console.log(favorites);
            return favorites;
        }
        catch (error) {
            console.log(error);
        }
    };
    const favoriteRemove = async (userId, postId) => {
        try {
            const removed = await FavoriteModel_1.default.findOneAndUpdate({ user: userId }, { $pull: { posts: postId } }, { new: true });
            return removed;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    };
    const getReports = async () => {
        try {
            const reports = await IncidentModel_1.default.find()
                .populate('ReportedPost')
                .populate('reportedUser');
            return reports;
        }
        catch (error) {
            console.log(error);
        }
    };
    return {
        addProductBefore,
        getUserProducts,
        allPosts,
        getPostDetails,
        postDelete,
        postEdit,
        postLike,
        getComment,
        addComments,
        getPostsAdmin,
        postReport,
        addFavorite,
        getFavorite,
        favoriteRemove,
        getReports
    };
};
exports.productRepositoryMongoDb = productRepositoryMongoDb;
