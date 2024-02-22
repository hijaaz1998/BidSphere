import { EditPostEntity, ProductEntityType } from "../../../entities/products";
import { productRepositoryMongoDb } from "../../../frameworks/databse/repositories/productRepositoryMongoDb";
import { EditProductInterface } from "../../../types/productInterface";
import { ProductDbInterface } from "../../interfaces/productDbRepository";
import { editPost } from "../../../entities/products";
import { isAwaitKeyword } from "typescript";

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

export const postLike = async (
    productRepository: ReturnType<ProductDbInterface>,
    postId: string,
    userId: string | undefined
) => {
    const liked = await productRepository.likePost(postId, userId);

    return liked
}

export const getComment = async (
    productRepository: ReturnType<ProductDbInterface>,
    postId: string
) => {
    const comments = await productRepository.getComments(postId)

    return comments
}

export const addComments = async (
    productRepository: ReturnType<ProductDbInterface>,
    userId: string | undefined,
    postId: string,
    comment: string
) => {
    const comments = await productRepository.addComment(userId, postId, comment)

    return comments
}

export const postReport = async (
    productRepository: ReturnType<ProductDbInterface>,
    userId: string | undefined,
    reportId: string,
    subject: string,
    issue: string
) => {
    const reported = await productRepository.reportPost(userId, reportId, subject, issue);

    return reported;
}

export const addFavorite = async ( productRepository: ReturnType<ProductDbInterface>,
    userId: string | undefined,
     postId: string) => {

    const favorite = await productRepository.addToFavorites(userId, postId);

    return favorite
}

export const getFavorite = async (
    productRepository: ReturnType<ProductDbInterface>,
    userId: string | undefined
) => {
    const favorite = await productRepository.getFavorites(userId)
    return favorite
}

export const favoriteRemove = async (
    productRepository: ReturnType<ProductDbInterface>,
    userId: string | undefined,
    postId: string
) => {
    const favorite = await productRepository.removeFavorite(userId, postId);

    return favorite
}