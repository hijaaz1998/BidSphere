import url from 'url';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { ProductDbInterface } from '../../application/interfaces/productDbRepository';
import { ProductRepositoryMongoDb } from '../../frameworks/databse/repositories/productRepositoryMongoDb';
import { EditProductInterface, ProductInterface } from '../../types/productInterface';

import { productAdd } from '../../application/usecases/product/addProduct';
import { getUserProducts, allPosts, getPostDetail, postDelete, postEdit, postLike, getComment, addComments } from '../../application/usecases/product/read';

interface AuthenticatedRequest extends Request { // Rename the interface to avoid naming conflict
    userId?: string;
  }

const   productController = (
    productDbRepository: ProductDbInterface,
    productDbRepositoryImpl: ProductRepositoryMongoDb
) => {

    const dbRepositoryProduct = productDbRepository(productDbRepositoryImpl());

    const addProduct = asyncHandler ( async (req: AuthenticatedRequest, res: Response) => {
        const product: ProductInterface = req.body.data;
        
        const userId = req.userId;
        
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

    const handleGetProductsOfUser = asyncHandler ( async (req: Request, res: Response) => {
        const userId = req.params.userId;
        console.log('req.params:', req.params);
        console.log('userId:', userId);

        
        let myProducts;
        if(userId){
             myProducts = await getUserProducts(dbRepositoryProduct, userId);
        }        

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

    const getPostDetails = asyncHandler ( async (req: Request, res: Response) => {
        const postId = req.params.postId
        const details = await getPostDetail(dbRepositoryProduct, postId)        

        res.json(
            details
        )
    })

    const deletePost = asyncHandler ( async (req: Request, res: Response) => {
        const postId = req.params.postId;
        const isDeleted = await postDelete(dbRepositoryProduct, postId);

        if(isDeleted){
            res.json({
                message: "Deleted successfully"
            })
        }
    })

    const editPost = asyncHandler( async (req: Request, res: Response) => {
        const post: EditProductInterface = req.body.data
        
        const postId = req.params.postId;
        const updated = await postEdit(dbRepositoryProduct, post, postId);

        if(updated){
            res.json({
                updated
            })
        }
    })

    const likePost = asyncHandler ( async (req: AuthenticatedRequest, res: Response) => {
        const postId = req.params.postId;
        const userId = req.userId;

        const updated = await postLike(dbRepositoryProduct, postId, userId);

        res.json({
            updated
        })
    })

    const getComments = asyncHandler( async (req: Request, res: Response) => {
        const postId = req.params.postId;

        const comments = await getComment(dbRepositoryProduct, postId)

        res.json({
            comments
        })
    })

    const addComment = asyncHandler ( async (req: AuthenticatedRequest, res: Response) => {
        const postId = req.params.postId;
        const {comment} = req.body;
        const userId = req.userId
        const commented = await addComments(dbRepositoryProduct, userId, postId, comment)

        res.json({
            commented
        })
    })

    return {
        addProduct,
        handleGetProductsOfUser,
        getAllPosts,
        getPostDetails,
        deletePost,
        editPost,
        likePost,
        getComments,
        addComment
    }
}

export default productController