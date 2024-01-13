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

    return {
        addProduct,
        getUsersAllProducts
    }
}

export type ProductDbInterface = typeof productDbRepository;