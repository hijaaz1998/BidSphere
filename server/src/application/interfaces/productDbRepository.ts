import { ProductRepositoryMongoDb } from "../../frameworks/databse/repositories/productRepositoryMongoDb";
import { EditPostEntity, ProductEntityType } from "../../entities/products";

export const productDbRepository = (
    repository: ReturnType<ProductRepositoryMongoDb>
) => {
    const addProduct = async (product: ProductEntityType) => {
        return await repository.addProductBefore(product);
    }

    const getUsersAllProducts = async(userId: string) => {
        return await repository.getUserProducts(userId)
    }

    const getAllPosts = async(userId: string) => {
        return await repository.allPosts(userId)
    }

    const getSinglePost = async ( postId: string ) => {
        return await repository.getPostDetails(postId)
    }

    const deletePost = async (postId: string) => {
        return await repository.postDelete(postId)
    }

    const editPost = async (post: EditPostEntity ,postId: string) => {
        return await repository.postEdit(post, postId)
    }

    const likePost = async( postId: string, userId: string | undefined) => {
        return await repository.postLike(postId, userId)
    }

    const getComments = async (postId: string) => {
        return await repository.getComment(postId)
    }

    const addComment = async (userId: string | undefined, postId: string, comment: string) => {
        return await repository.addComments(userId, postId, comment)
    }

    const getAllPostsAdmin = async () => {
        return await repository.getPostsAdmin()
    }
    
    

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
        getAllPostsAdmin
    }
}

export type ProductDbInterface = typeof productDbRepository;