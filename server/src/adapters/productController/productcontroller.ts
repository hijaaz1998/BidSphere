import url from 'url';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { ProductDbInterface } from '../../application/interfaces/productDbRepository';
import { ProductRepositoryMongoDb } from '../../frameworks/databse/repositories/productRepositoryMongoDb';
import { EditProductInterface, ProductInterface } from '../../types/productInterface';

import { productAdd,  } from '../../application/usecases/product/addProduct';
import { getUserProducts, allPosts, getPostDetail, postDelete, postEdit, postLike, getComment, addComments, postReport, addFavorite, getFavorite, favoriteRemove } from '../../application/usecases/product/read';
import { authService } from '../../frameworks/services/authService';

interface AuthenticatedRequest extends Request { // Rename the interface to avoid naming conflict
    userId?: string;
  }

const   productController = (
    productDbRepository: ProductDbInterface,
    productDbRepositoryImpl: ProductRepositoryMongoDb
) => {

    const dbRepositoryProduct = productDbRepository(productDbRepositoryImpl());

    const addProduct = asyncHandler ( async (req: AuthenticatedRequest, res: Response) => {
       try {
        const product: ProductInterface = req.body.data;
        console.log(req.body.data)
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
       } catch (error) {
        console.log(error)
       }
    })

    const handleGetProductsOfUser = asyncHandler ( async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId;
        
            let myProducts;
            if(userId){
                myProducts = await getUserProducts(dbRepositoryProduct, userId);
            }        

            res.json({
                myProducts
            })
        } catch (error) {
            console.log(error)
        }
    })

    const getAllPosts = asyncHandler( async (req: AuthenticatedRequest, res:Response) => {
       try {
        const userId = req.userId
        let posts;
        if(userId){
             posts = await allPosts(dbRepositoryProduct, userId)
        }        

        res.json({
            posts
        })
       } catch (error) {
        console.log(error)
       }
    })

    const getPostDetails = asyncHandler ( async (req: Request, res: Response) => {
        try {
            const postId = req.params.postId
            const details = await getPostDetail(dbRepositoryProduct, postId)        

            res.json(
                details
            )
        } catch (error) {
            console.log(error)
        }
    })

    const deletePost = asyncHandler ( async (req: Request, res: Response) => {
        try {
            const postId = req.params.postId;
            const isDeleted = await postDelete(dbRepositoryProduct, postId);

            if(isDeleted){
                res.json({
                    message: "Deleted successfully"
                })
            }
        } catch (error) {
            console.log(error)
        }
    })

    const editPost = asyncHandler( async (req: Request, res: Response) => {
        try {
            const post: EditProductInterface = req.body.data
        
            const postId = req.params.postId;
            const updated = await postEdit(dbRepositoryProduct, post, postId);

            if(updated){
                res.json({
                    updated
                })
            }
        } catch (error) {
            console.log(error)
        }
    })

    const likePost = asyncHandler ( async (req: AuthenticatedRequest, res: Response) => {
        try {
            const postId = req.params.postId;
            const userId = req.userId;

            const updated = await postLike(dbRepositoryProduct, postId, userId);

            res.json({
                updated
            })
        } catch (error) {
            console.log(error)
        }
    })

    const getComments = asyncHandler( async (req: Request, res: Response) => {
        try {
            const postId = req.params.postId;

            const comments = await getComment(dbRepositoryProduct, postId)

            res.json({
                comments
            })
        } catch (error) {
            console.log(error)
        }
    })

    const addComment = asyncHandler ( async (req: AuthenticatedRequest, res: Response) => {
        try {
            const postId = req.params.postId;
            const {comment} = req.body;
            const userId = req.userId
            const commented = await addComments(dbRepositoryProduct, userId, postId, comment)

            res.json({
                commented
            })
        } catch (error) {
            console.log(error)
        }
    })

    const reportPost = asyncHandler ( async (req: AuthenticatedRequest, res: Response) => {

        try {
            const {reportId, issue, subject } = req.body.data
            const userId = req.userId

            const reported = await postReport(dbRepositoryProduct, userId, reportId, subject, issue);
            
            if(!reported){
                res.json({
                    success: false,
                    message: "Already Reported"
                })
            } else {
                res.json({
                    success: true,
                    message: "Reported successfully"
                })
            } 
        } catch (error) {
            console.log(error)
        }  
    })

    const addToFavorite = asyncHandler( async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = req.userId
            const postId = req.body.postId

            const favorite = await addFavorite(dbRepositoryProduct ,userId, postId)

            if(favorite){
                res.json({
                    message: 'Added to favorites'
                })
            }
        } catch (error) {
            console.log(error)
        }
        
    })

    const getFavorites = asyncHandler ( async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = req.userId;
            const favorites = await getFavorite(dbRepositoryProduct,userId)

            res.json({
                favorites
            })
        } catch (error) {
            console.log(error)
        }
    })

    const removeFavorite = asyncHandler( async (req: AuthenticatedRequest, res: Response) => {
       try {
        const userId = req.userId;
        const postId = req.params.id;

        const favorites = await favoriteRemove(dbRepositoryProduct, userId, postId)

        res.json({
            favorites
        })
       } catch (error) {
        console.log(error)
       }
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
        addComment,
        reportPost,
        addToFavorite,
        getFavorites,
        removeFavorite
    }
}

export default productController