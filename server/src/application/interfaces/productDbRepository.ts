import { ProductRepositoryMongoDb } from "../../frameworks/databse/repositories/productRepositoryMongoDb";
import { ProductEntityType } from "../../entities/products";

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

    return {
        addProduct,
        getUsersAllProducts,
        getAllPosts
    }
}

export type ProductDbInterface = typeof productDbRepository;