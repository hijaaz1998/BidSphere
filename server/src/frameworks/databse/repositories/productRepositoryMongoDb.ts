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

    const postLike = async (postId: string, userId: string | undefined) => {
        try {
          const existingPost = await Product.findById(postId);
      
          if (!existingPost) {
            return null;
          }
      
          const likedByUser = existingPost.likes.some((like) => like?.user?.toString() === userId);
      
          let updated;
      
          if (likedByUser) {
            updated = await Product.findByIdAndUpdate(
              postId,
              {
                $pull: { likes: { user: userId } },
              },
              { new: true }
            );
          } else {
            updated = await Product.findByIdAndUpdate(
              postId,
              {
                $addToSet: { likes: { user: userId } },
              },
              { new: true }
            );
          }
      
          if (updated) {
            return updated;
          }
        } catch (error) {
          console.error("Error updating likes:", error);
          return null;
        }
      };

      const getComment = async (postId: string) => {
        try {
          const product = await Product.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(postId) } },
            {
              $unwind: "$comments", // Deconstruct the comments array
            },
            {
              $sort: { "comments.createdOn": -1 }, // Sort comments in descending order based on creation time
            },
            {
              $limit: 5, // Limit the result to 5 comments
            },
            {
              $lookup: {
                from: "users", // Replace with the actual collection name for users
                localField: "comments.user",
                foreignField: "_id",
                as: "user",
              },
            },
            {
              $unwind: "$user",
            },
            {
              $project: {
                _id: 0,
                commentText: "$comments.comment",
                user: { firstName: "$user.firstName", lastName: "$user.lastName" },
              },
            },
          ]);
      
          return product;
        } catch (error) {
          console.error("Error getting comments with users:", error);
          throw error;
        }
      };
      
      
      

    const addComments = async (userId: string | undefined, postId: string, comment: string) => {
        try {
          const product = await Product.findById(postId);
      
          if (!product) {
            console.error('Product not found');
            return;
          }
      
          const newComment = {
            user: userId, 
            comment: comment,
          };
      
          product.comments.push(newComment);
      
          await product.save();

          return product;
      
        } catch (error) {
          console.error('Error adding comment:', error);
        }
    };
      
    const getPostsAdmin = async () => {
      const posts = await Product.find({ isDeleted: false })
      .populate({
        path: 'userId',
        model: 'User',
        select: 'firstName lastName email',
      })
      .exec();

      return posts
    }  
    
 
    return {
        addProductBefore,
        getUserProducts,
        allPosts,
        getPostDetails,
        postDelete,
        postEdit,
        postLike,
        getComment,
        addComments,
        getPostsAdmin
    }
}

export type ProductRepositoryMongoDb = typeof productRepositoryMongoDb