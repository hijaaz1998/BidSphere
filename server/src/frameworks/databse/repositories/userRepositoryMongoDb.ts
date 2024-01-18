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
        console.log("newUser", newUser);
        console.log("newUser", newUser._id);
        
        
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
        const data = await User.find({ _id: { $ne: userId } });
        return data;
    };
    
    const followTheUser = async (followedId: string, followedById: string) => {
        try {
            console.log("cm");
            const followedByUser = await User.findById(followedById);

            followedByUser?.followers.push({ user: followedId });

            await followedByUser?.save();

            console.log(followedByUser);
            

            if(followedByUser){
                return followedByUser
            }

        } catch (error) {
            console.log(error);
            
        }
    }  
      

    return{
        addUser,
        getUserByEmail,
        getAllUsers,
        blockUser,
        getSuggestion,
        followTheUser
    }
}

export type UserRepositoryMongoDb = typeof userRepositoryMongoDb;