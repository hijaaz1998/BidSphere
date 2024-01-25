import express from 'express'
import productController from '../../../adapters/productController/productcontroller'
import { productDbRepository } from '../../../application/interfaces/productDbRepository'
import { ProductRepositoryMongoDb, productRepositoryMongoDb } from '../../databse/repositories/productRepositoryMongoDb'
import jwtAuth from '../../../utils/middleware/jwtAuth'

const productRouter = () => {
    const router = express.Router();

    const controller = productController(
        productDbRepository,
        productRepositoryMongoDb
    );

    router.post('/addProduct', jwtAuth, controller.addProduct);
    router.get('/getProducts', jwtAuth, controller.handleGetProductsOfUser);
    router.get('/get_all_posts', jwtAuth, controller.getAllPosts);
    router.get('/postDetails/:postId', controller.getPostDetails);
    router.patch('/deletePost/:postId', controller.deletePost);
    router.put('/editPost/:postId', controller.editPost);

    return router;
}

export default productRouter
