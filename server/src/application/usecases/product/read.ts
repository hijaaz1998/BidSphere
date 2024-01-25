import { EditPostEntity, ProductEntityType } from "../../../entities/products";
import { productRepositoryMongoDb } from "../../../frameworks/databse/repositories/productRepositoryMongoDb";
import { EditProductInterface } from "../../../types/productInterface";
import { ProductDbInterface } from "../../interfaces/productDbRepository";
import { editPost } from "../../../entities/products";

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

export const getPostDetail = async(
    productRepository: ReturnType<ProductDbInterface>,
    postId: string
) => {
    const post = await productRepository.getSinglePost(postId)

    return post;
}

export const postDelete = async (
    productRepository: ReturnType<ProductDbInterface>,
    postId: string
) => {
    const deleted = await productRepository.deletePost(postId)

    return deleted
}

export const postEdit = async (
    productRepository: ReturnType<ProductDbInterface>,
    post: EditProductInterface,
    postId: string
) => {
    const {productName, description, age, condition, rarity} = post;

    const editPostEntity: EditPostEntity = editPost(productName, description, age, condition, rarity);

    const updated = await productRepository.editPost(editPostEntity,postId)

    return updated
}