import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { ProductDbInterface } from '../../application/interfaces/productDbRepository';
import { ProductRepositoryMongoDb } from '../../frameworks/databse/repositories/productRepositoryMongoDb';
import { ProductBeforeAuctionInterface } from '../../types/productInterface';

import { productAdd } from '../../application/usecases/product/addProduct';
import { getUserProducts } from '../../application/usecases/product/read';

const productController = (
    productDbRepository: ProductDbInterface,
    productDbRepositoryImpl: ProductRepositoryMongoDb
) => {

    const dbRepositoryProduct = productDbRepository(productDbRepositoryImpl());

    const addProduct = asyncHandler ( async (req: Request, res: Response) => {
        const product: ProductBeforeAuctionInterface = req.body;

        const createdProduct = await productAdd(
            product,
            dbRepositoryProduct,
        )

        res.json({
            status: 'success',
            message: 'product added'
        })
    })

    const handleGetProductsOfUser = asyncHandler ( async (req: Request, res: Response) => {
        const userId : any = req.params.userId;
        const myProducts = await getUserProducts(dbRepositoryProduct, userId);
        console.log("aaaa",myProducts);
        

        res.json({
            myProducts
        })
    })

    return {
        addProduct,
        handleGetProductsOfUser
    }
}

export default productController