import Product from '../model/productModel'
import { EditPostEntity, ProductEntityType } from '../../../entities/products';
import mongoose,{Types, ObjectId} from 'mongoose';
import User from '../model/userModel';
import Incidents from '../model/IncidentModel';
import { postEdit } from '../../../application/usecases/product/read';
import { report } from 'process';
import { factory } from 'typescript';
import Favorite from '../model/FavoriteModel';

export const productRepositoryMongoDb = () => {
    const addProductBefore = async(product: ProductEntityType) => {
        try {
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
        } catch (error) {
          console.log(error)
        }
    }

    const getUserProducts = async(userId: string) => {
        try {
          const products: any = await Product.find({ userId: userId, isDeleted: false }).lean();
        
          return products
        } catch (error) {
          console.log(error);
          
        }
    }

    const allPosts = async (userId: string) => {
        try {
            const user = await User.findById(userId);
            let followingIds;
    
            if (user) {
                followingIds = user.following.map(followedUser => followedUser.toString());
            }
    
            const posts = await Product.find({ userId: { $in: followingIds }, isDeleted: false, isBlocked: false })
                        .sort({ createdOn: -1 })
                        .populate('userId', 'firstName lastName image');
    
            return posts;
    
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    };
    
    const getPostDetails = async (postId: string) => {
        try {
          const post = await Product.findById(postId).populate('userId');       
          return post;
        } catch (error) {
          console.log(error)
        }
    };
    
    const postDelete = async (postId: string) => {
        try {
          await Product.findByIdAndUpdate(postId, {isDeleted: true})

          return true
        } catch (error) {
          console.log(error);
          
        }
    }

    const postEdit = async (post: EditPostEntity ,postId: string) => {
        try {
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
        } catch (error) {
          console.log(error)
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
              $unwind: "$comments",
            },
            {
              $sort: { "comments.createdOn": -1 }, 
            },
            {
              $limit: 5,
            },
            {
              $lookup: {
                from: "users",
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
      try {
        const posts = await Product.find({ isDeleted: false })
        .populate({
          path: 'userId',
          model: 'User',
          select: 'firstName lastName email',
        })
        .exec();

        return posts
      } catch (error) {
        console.log(error)
      }
    }  

    const postReport = async (
      userId: string | undefined,
      reportId: string,
      subject: string,
      issue: string
    ) => {
      try {
        const existing = await Incidents.findOne({reportedUser: userId});

        if(existing){
          return false
        }

        const newIncident =  new Incidents({
          subject,
          issue,
          reportedUser: userId,
          ReportedPost: reportId
        })

        const updated = await Product.findByIdAndUpdate(
          reportId,
          { $inc: { reportCount: 1 } },
          { new: true }
        );
        
        if (updated && updated.reportCount >= 5) {
          await Product.findByIdAndUpdate(
            reportId,
            { isBlocked: true }
          );
        }        

        const saved = await newIncident.save();
        return saved
      } catch (error) {
        console.log(error)
      }
    }
    
    const addFavorite = async (userId: string | undefined, postId: string) => {
      try {
        let favorite;
    
        const existingFavorite = await Favorite.findOne({
          user: userId,
          posts: { $in: [postId] }
        });
    
        if (!existingFavorite) {
          favorite = await Favorite.findOneAndUpdate(
            { user: userId },
            { $push: { posts: postId } },
            { new: true, upsert: true }
          );
        } else {
          favorite = existingFavorite;
        }
    
        return favorite;
      } catch (error) {
        console.log(error);
      }
    };

    const getFavorite = async (userId: string | undefined) => {
      try {
        const products = await Favorite.findOne({ user: userId }).populate('posts');
        const favorites = products ? products.posts : [];
        console.log(favorites);
        
        return favorites
      } catch (error) {
        console.log(error);
      }
    }
    

    const favoriteRemove = async (userId: string | undefined, postId: string) => {
        try {
            const removed = await Favorite.findOneAndUpdate(
                { user: userId },
                { $pull: { posts: postId } },
                { new: true } 
            );

            console.log("Removed:", removed);
            return removed;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

  
    const getReports = async()=> {
      const reports = await Incidents.find();

      const filteredData = reports.reduce((acc: any, obj) => {
        const key = obj.ReportedPost.toString();
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});
      
      const resultArray = Object.values(filteredData);
      console.log(reports)
      
      console.log("filtered",resultArray);

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
        getPostsAdmin,
        postReport,
        addFavorite,
        getFavorite,
        favoriteRemove,
        getReports
    }
}

export type ProductRepositoryMongoDb = typeof productRepositoryMongoDb