import { ProductBeforeAuctionInterface } from "../../../types/productInterface";
import { ProductDbInterface } from "../../interfaces/productDbRepository";

export const getUserProducts = async (
    productRepository: ReturnType<ProductDbInterface>,
    userId: string
    ) => {
    const products = await productRepository.getUsersAllProducts(userId);

    return products
}

export const allPosts = async (
    productRepository: ReturnType<ProductDbInterface>,
    userId: string
) => {
    const posts = await productRepository.getAllPosts(userId);

    return posts
}