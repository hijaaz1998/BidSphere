import {ObjectId} from 'mongoose';
import User from '../model/userModel';
import { createUserInterface } from '../../../types/userInterface';
import { UserEntityType } from '../../../entities/user';

export const userRepositoryMongoDb = () => {
    const addUser = async (user: UserEntityType) => {
        const newUser: any = new User({
            firstName: user.getFirstName(),
            lastName: user.getLastName(),
            email: user.getEmail(),
        });
        newUser.save();
        
        return newUser;
    }

    const getUserByEmail = async (email: string) => {
        const user: {firstName: string, lastName: string} | null = await User.findOne({email});
        return user
    }

    return{
        addUser,
        getUserByEmail
    }
}

export type UserRepositoryMongoDb = typeof userRepositoryMongoDb;