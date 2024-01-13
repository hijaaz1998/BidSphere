import express from 'express'
import productController from '../../../adapters/productController/productcontroller'
import { productDbRepository } from '../../../application/interfaces/productDbRepository'
import { ProductRepositoryMongoDb, productRepositoryMongoDb } from '../../databse/repositories/productRepositoryMongoDb'

const productRouter = () => {
    const router = express.Router();

    const controller = productController(
        productDbRepository,
        productRepositoryMongoDb
    );

    router.post('/addProduct', controller.addProduct);
    router.get('/getProducts/:userId', controller.handleGetProductsOfUser);

    return router;
}

export default productRouter
