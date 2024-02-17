import {ObjectId} from 'mongoose';
import User from '../model/userModel';
import { UserInterface, createUserInterface, UserAfterLogin } from '../../../types/userInterface';
import { UserEntityType } from '../../../entities/user';
import { log } from 'console';
import Favorite from '../model/FavoriteModel';

export const userRepositoryMongoDb = () => {
    const addUser = async (user: UserEntityType) => {
        const newUser: any = new User({
            firstName: user.getFirstName(),
            lastName: user.getLastName(),
            email: user.getEmail(),
            phoneNumber: user.getPhoneNumber(),
            password: user.getPassword()
        });
        await newUser.save();

        return newUser;
    }

    const getUserByEmail = async (email: string) => {
        const user: UserAfterLogin | null = await User.findOne({ email });
    
        if (user) {
            const { _id, firstName, lastName, password } = user;
            return { _id, firstName, lastName, password };
        }
    
        return null;
    };
    
    const getAllUsers = async () => {
        const user: UserInterface[] | null = await User.find();
        return user
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
    
    
    const shuffleArray = (array: any[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
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
        const checkEmail = await User.findOne({email});
        return checkEmail
    }

    const changeThePassword = async (email: string, password: string) => {
        const user = await User.findOne({email})

        if(user){
            user.password = password;
            await user.save()
        }

        return true
        
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
        console.log(search, "search");
    
        const keyword = search ? {
            $or: [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ]
        } : {};
    
        const users = await User.find({
            ...keyword,
            _id: { $ne: userId }
        })
        .select('firstName lastName');
    
        console.log("users",users);
        
        return users;
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
        getFavorites
    }
}

export type UserRepositoryMongoDb = typeof userRepositoryMongoDb;