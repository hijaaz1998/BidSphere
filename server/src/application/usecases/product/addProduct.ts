import { ProductBeforeAuctionInterface } from "../../../types/productInterface";
import { ProductDbInterface } from "../../interfaces/productDbRepository";
import createProductEntityBeforeAuction, {ProductEntityType} from '../../../entities/products';

export const productAdd = async (
    product: ProductBeforeAuctionInterface,
    productRepository: ReturnType<ProductDbInterface>
) => {
    const {productName, image, userId} = product
    const productEntity: ProductEntityType = createProductEntityBeforeAuction(
        productName,
        image,
        userId
    )
    
    const createdProduct: any = await productRepository.addProduct(productEntity);

    return createdProduct
}