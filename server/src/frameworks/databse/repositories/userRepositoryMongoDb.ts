import {ObjectId} from 'mongoose';
import User from '../model/userModel';
import { UserInterface, createUserInterface, UserAfterLogin } from '../../../types/userInterface';
import { UserEntityType } from '../../../entities/user';

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
      
          console.log(`User ${user.isBlocked ? 'blocked' : 'unblocked'} successfully.`);
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
    
            const followedByUser = await User.findById(followedById);
            return followedByUser;
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
            console.log("isExisting",isExisting);
            
            return isExisting
        }
    }
    
      
      

    return{
        addUser,
        getUserByEmail,
        getAllUsers,
        blockUser,
        getSuggestion,
        followTheUser,
        googleAuth
    }
}

export type UserRepositoryMongoDb = typeof userRepositoryMongoDb;