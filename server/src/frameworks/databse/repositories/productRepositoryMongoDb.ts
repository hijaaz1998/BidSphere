import Product from '../model/productModel'
import { ProductEntityType } from '../../../entities/products';
import mongoose,{Types, ObjectId} from 'mongoose';
import User from '../model/userModel';

export const productRepositoryMongoDb = () => {
    const addProductBefore = async(product: ProductEntityType) => {
        console.log("lllll",product.getUserId());
        
        const newProduct: any = new Product({
            productName: product.getProductName(),
            image: product.getImage(),
            userId: product.getUserId()
            
        });
        await newProduct.save();

        return newProduct
    }

    const getUserProducts = async(userId: string) => {
        
        const products: any = await Product.find({userId: userId}).lean()
        return products
    }

    const allPosts = async (userId: string) => {
        try {
            const user = await User.findById(userId);
            let followingIds;
    
            if (user) {
                followingIds = user.following.map(followedUser => followedUser.toString());
            }
    
            const posts = await Product.find({ userId: { $in: followingIds } })
                .sort({ createdOn: -1 })
                .populate('userId', 'firstName lastName');
    
            return posts;
    
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    };
    
    
    

    return {
        addProductBefore,
        getUserProducts,
        allPosts
    }
}

export type ProductRepositoryMongoDb = typeof productRepositoryMongoDb