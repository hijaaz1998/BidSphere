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

    return {
        addProduct,
        getUsersAllProducts,
        getAllPosts,
        getSinglePost,
        deletePost,
        editPost
    }
}

export type ProductDbInterface = typeof productDbRepository;