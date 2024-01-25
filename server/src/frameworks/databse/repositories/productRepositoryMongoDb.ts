import Product from '../model/productModel'
import { EditPostEntity, ProductEntityType } from '../../../entities/products';
import mongoose,{Types, ObjectId} from 'mongoose';
import User from '../model/userModel';
import { postEdit } from '../../../application/usecases/product/read';

export const productRepositoryMongoDb = () => {
    const addProductBefore = async(product: ProductEntityType) => {
        
        const newProduct: any = new Product({
            productName: product.getProductName(),
            description: product.getDescription(),
            age: product.getAge(),
            condition: product.getCondition(),
            rarity: product.getRarity(),
            image: product.getImage(),
            userId: product.getUserId()
        });
        await newProduct.save();

        return newProduct
    }

    const getUserProducts = async(userId: string) => {
        
        const products: any = await Product.find({ userId: userId, isDeleted: false }).lean();
        return products
    }

    const allPosts = async (userId: string) => {
        try {
            const user = await User.findById(userId);
            let followingIds;
    
            if (user) {
                followingIds = user.following.map(followedUser => followedUser.toString());
            }
    
            const posts = await Product.find({ userId: { $in: followingIds }, isDeleted: false })
                        .sort({ createdOn: -1 })
                        .populate('userId', 'firstName lastName');
    
            return posts;
    
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    };
    
    const getPostDetails = async (postId: string) => {
        const post = await Product.findById(postId).populate('userId');
        
        return post;
    };
    
    const postDelete = async (postId: string) => {
        await Product.findByIdAndUpdate(postId, {isDeleted: true})

        return true
    }

    const postEdit = async (post: EditPostEntity ,postId: string) => {
        const updatedProduct = await Product.findOneAndUpdate(
            { _id: postId },
            {
                productName: post.getProductName(),
                description: post.getDescription(),
                age: post.getAge(),
                condition: post.getCondition(),
                rarity: post.getRarity(),
            },
            { new: true }
        );

        if(updatedProduct){
            return updatedProduct
        }
    }
 
    return {
        addProductBefore,
        getUserProducts,
        allPosts,
        getPostDetails,
        postDelete,
        postEdit
    }
}

export type ProductRepositoryMongoDb = typeof productRepositoryMongoDb