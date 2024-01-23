import url from 'url';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { ProductDbInterface } from '../../application/interfaces/productDbRepository';
import { ProductRepositoryMongoDb } from '../../frameworks/databse/repositories/productRepositoryMongoDb';
import { ProductBeforeAuctionInterface } from '../../types/productInterface';

import { productAdd } from '../../application/usecases/product/addProduct';
import { getUserProducts, allPosts } from '../../application/usecases/product/read';

interface AuthenticatedRequest extends Request { // Rename the interface to avoid naming conflict
    userId?: string;
  }

const   productController = (
    productDbRepository: ProductDbInterface,
    productDbRepositoryImpl: ProductRepositoryMongoDb
) => {

    const dbRepositoryProduct = productDbRepository(productDbRepositoryImpl());

    const addProduct = asyncHandler ( async (req: AuthenticatedRequest, res: Response) => {
        const product: ProductBeforeAuctionInterface = req.body;
        const userId = req.userId;
        console.log("userrrr",userId);
        
        if(userId !== undefined){

            const createdProduct = await productAdd(
                userId,
                product,
                dbRepositoryProduct,
                )
        }

        res.json({
            status: 'success',
            message: 'product added'
        })
    })

    const handleGetProductsOfUser = asyncHandler ( async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.userId
        let myProducts;
        if(userId){
             myProducts = await getUserProducts(dbRepositoryProduct, userId);
        }
        console.log("aaaa",myProducts);
        

        res.json({
            myProducts
        })
    })

    const getAllPosts = asyncHandler( async (req: AuthenticatedRequest, res:Response) => {
        const userId = req.userId
        let posts;
        if(userId){
             posts = await allPosts(dbRepositoryProduct, userId)
        }        

        res.json({
            posts
        })
    })

    return {
        addProduct,
        handleGetProductsOfUser,
        getAllPosts
    }
}

export default productController