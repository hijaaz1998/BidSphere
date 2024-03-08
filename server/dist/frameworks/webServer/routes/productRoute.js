"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productcontroller_1 = __importDefault(require("../../../adapters/productController/productcontroller"));
const productDbRepository_1 = require("../../../application/interfaces/productDbRepository");
const productRepositoryMongoDb_1 = require("../../databse/repositories/productRepositoryMongoDb");
const jwtAuth_1 = __importDefault(require("../../../utils/middleware/jwtAuth"));
const productRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, productcontroller_1.default)(productDbRepository_1.productDbRepository, productRepositoryMongoDb_1.productRepositoryMongoDb);
    router.post('/addProduct', jwtAuth_1.default, controller.addProduct);
    router.get('/getPosts/:userId', jwtAuth_1.default, controller.handleGetProductsOfUser);
    router.get('/get_all_posts', jwtAuth_1.default, controller.getAllPosts);
    router.get('/postDetails/:postId', controller.getPostDetails);
    router.patch('/deletePost/:postId', controller.deletePost);
    router.put('/editPost/:postId', controller.editPost);
    router.patch('/like/:postId', jwtAuth_1.default, controller.likePost);
    router.get('/comments/:postId', controller.getComments);
    router.post('/addComment/:postId', jwtAuth_1.default, controller.addComment);
    router.post('/report', jwtAuth_1.default, controller.reportPost);
    router.post('/add_to_favorites', jwtAuth_1.default, controller.addToFavorite);
    router.get('/get_favorites', jwtAuth_1.default, controller.getFavorites);
    router.put('/remove_favorite/:id', jwtAuth_1.default, controller.removeFavorite);
    return router;
};
exports.default = productRouter;
