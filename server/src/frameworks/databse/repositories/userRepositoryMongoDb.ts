import {ObjectId} from 'mongoose';
import User from '../model/userModel';
import { UserInterface, createUserInterface, UserAfterLogin, updateInterface } from '../../../types/userInterface';
import { UserEntityType } from '../../../entities/user';
import { log } from 'console';
import Favorite from '../model/FavoriteModel';
import { shuffleArray } from '../../../utils/middleware/shuffleArray';

export const userRepositoryMongoDb = () => {
    const addUser = async (user: UserEntityType) => {
        try {
            const newUser: any = new User({
                firstName: user.getFirstName(),
                lastName: user.getLastName(),
                email: user.getEmail(),
                phoneNumber: user.getPhoneNumber(),
                password: user.getPassword()
            });
            await newUser.save();
    
            return newUser;
        } catch (error) {
            console.log(error)
        }
    }

    const getUserByEmail = async (email: string) => {
        try {
            const user: UserAfterLogin | null = await User.findOne({ email });
    
            if (user) {
                const { _id, firstName, lastName, password } = user;
                return { _id, firstName, lastName, password };
            }
        
            return null;
        } catch (error) {
            console.log(error);
            
        }
    };
    
    const getAllUsers = async () => {
        try {
            const user: UserInterface[] | null = await User.find();
            return user
        } catch (error) {
            console.log(error)
        }
    }

    const blockUser = async (userId: string) => {
        try {
          const user = await User.findById(userId);
      
          if (!user) {
            console.log('User not found.');
            return;
          }
      
          user.isBlocked = !user.isBlocked;
      
          await user.save();
      
        } catch (error) {
          console.error('Error blocking/unblocking user:', error);
        }
    };

    const getSuggestion = async (userId: string) => {
        try {
            const loggedInUser: UserInterface = await User.findById(userId) as UserInterface;
    
            const usersNotInFollowing = await User.find({
                _id: { $nin: [...loggedInUser.following, userId] }
            });
    
            const shuffledUsers = shuffleArray(usersNotInFollowing);
    
            const randomUsers = shuffledUsers.slice(0, 5);
    
            return randomUsers;
        } catch (error) {
            console.error('Error getting random users:', error);
            throw error;
        }
    };
    
    const followTheUser = async (followedId: string, followedById: string) => {
        try {
            await User.updateOne(
                { _id: followedById },
                { $addToSet: { following: followedId } }
            );
    
            await User.updateOne(
                { _id: followedId },
                { $addToSet: { followers: followedById } }
            );
    
            const followedUser = await User.findById(followedId);
            
            return followedUser;
        } catch (error) {
            console.log(error);
        }
    };

    const googleAuth = async (firstName: string, lastName: string, email: string, jti: string) => {
        try {
            const isExisting = await User.findOne({email: email})

            if(!isExisting){
                const newUser: any = new User({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    jti: jti
                });
                await newUser.save();

                return newUser
            } else {            
                return isExisting
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    const unfollowTheUser = async (logedInUser: string | undefined, unfollowedId: string) => {
        try {
            await User.updateOne(
                {_id: logedInUser},
                {$pull: {following: unfollowedId}}
            );

            await User.updateOne(
                {_id: unfollowedId},
                {$pull: {followers: logedInUser}}
            )

            const unfollowedUser = await User.findById(unfollowedId)

            return unfollowedUser
            
        } catch (error) {
            console.log(error)
        }
    } 
      
    const checkEmailIsThere = async (email: string) => {
        try {
            const checkEmail = await User.findOne({email});
            return checkEmail
        } catch (error) {
            console.log(error)
        }
    }

    const changeThePassword = async (email: string, password: string) => {
        try {
            const user = await User.findOne({email})

            if(user){
                user.password = password;
                await user.save()
            }

            return true
        } catch (error) {
            console.log(error)
        }
        
    }

    const getFollowingList = async (userId: string | undefined) => {

        try {
            const user = await User.findById(userId).populate('following', 'firstName lastName')

            const following = user?.following;

            return following
                        
        } catch (error) {
            console.log(error);
            
        }
        
    }

    const getFollowersList = async (userId: string | undefined) => {
        try {
            const user = await User.findById(userId).populate('followers', 'firstName lastName')

            const follwersList = user?.followers;

            return follwersList
        } catch (error) {
            console.log(error)
        }
    }

    const getUserInfo = async (userId: string) => {
        try {

            const user = await User.findById(userId);
            return user;

        } catch (error) {
            console.log(error);
        }
    }

    const userSearch = async (userId: string | undefined, search: string) => {
        try {
            const keyword = search ? {
                $or: [
                    { firstName: { $regex: search, $options: 'i' } },
                    { lastName: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } }
                ]
            } : {};
        
            const users = await User.find({
                $and: [
                    {
                        $or: [
                            { firstName: { $regex: search, $options: 'i' } },
                            { lastName: { $regex: search, $options: 'i' } },
                            { email: { $regex: search, $options: 'i' } }
                        ]
                    },
                    { _id: { $ne: userId } },
                    { _id: { $in: (await User.findById(userId))?.following || [] } } // Filter by users followed by the current user
                ]
            })
            .select('firstName lastName');
                
            return users;
        } catch (error) {
            console.log(error)
        }        
    };
    
    
    const getFavorites = async (userId: string) => {
        try {
            const favorites = await Favorite.find({ user: userId }).populate('posts');
            return favorites;
        } catch (error) {
            console.error('Error fetching favorites:', error);
            throw error;
        }
    };
     
    const profileUpdate = async (
        user: updateInterface,
        userId: string | undefined
    ) => {
        try {
            const updated = User.findByIdAndUpdate(userId, {
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image
            }, {new: true})


            return updated
            
        } catch (error) {
            console.log(error)
        }
    }

    return{
        addUser,
        getUserByEmail,
        getAllUsers,
        blockUser,
        getSuggestion,
        followTheUser,
        googleAuth,
        unfollowTheUser,
        checkEmailIsThere,
        changeThePassword,
        getFollowingList,
        getFollowersList,
        getUserInfo,
        userSearch,
        getFavorites,
        profileUpdate
    }
}

export type UserRepositoryMongoDb = typeof userRepositoryMongoDb;