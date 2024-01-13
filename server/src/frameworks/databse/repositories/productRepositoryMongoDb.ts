import Product from '../model/productModel'
import { ProductEntityType } from '../../../entities/products';
import mongoose,{ObjectId} from 'mongoose';

export const productRepositoryMongoDb = () => {
    const addProductBefore = async(product: ProductEntityType) => {
        const newProduct: any = new Product({
            productName: product.getProductName(),
            image: product.getImage(),
            userId: product.getUserId()
            
        });
        await newProduct.save();

        return newProduct
    }

    const getUserProducts = async(userId: string | ObjectId) => {
        const products: any = await Product.find({userId: userId}).lean()
        console.log("products",products);
        return products
    }

    return {
        addProductBefore,
        getUserProducts
    }
}

export type ProductRepositoryMongoDb = typeof productRepositoryMongoDb