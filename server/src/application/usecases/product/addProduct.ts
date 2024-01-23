import { ProductBeforeAuctionInterface } from "../../../types/productInterface";
import { ProductDbInterface } from "../../interfaces/productDbRepository";
import createProductEntityBeforeAuction, {ProductEntityType} from '../../../entities/products';

export const productAdd = async (
    userId: string,
    product: ProductBeforeAuctionInterface,
    productRepository: ReturnType<ProductDbInterface>
) => {
    const {productName, image} = product;
    const userID = userId
    
    const productEntity: ProductEntityType = createProductEntityBeforeAuction(
        productName,
        image,
        userID
    )
    
    const createdProduct: any = await productRepository.addProduct(productEntity);

    return createdProduct
}