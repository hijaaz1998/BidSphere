import { ProductInterface } from "../../../types/productInterface";
import { ProductDbInterface } from "../../interfaces/productDbRepository";
import {productBeforeAuction, ProductEntityType} from '../../../entities/products';

export const productAdd = async (
    userId: string,
    product: ProductInterface,
    productRepository: ReturnType<ProductDbInterface>
) => {
    const {productName, description, age, condition, rarity, image} = product;
    const userID = userId
    
    const productEntity: ProductEntityType = productBeforeAuction(
        productName,
        description,
        age,
        condition,
        rarity,
        image,
        userID
    )
    
    const createdProduct: any = await productRepository.addProduct(productEntity);

    return createdProduct
}