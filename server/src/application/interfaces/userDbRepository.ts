import { ObjectId } from "mongoose";
import { UserRepositoryMongoDb } from "../../frameworks/databse/repositories/userRepositoryMongoDb";
import { UserEntityType } from "../../entities/user";

export const userDbRepository = (
    repository: ReturnType<UserRepositoryMongoDb>
    ) => {
    const addUser = async (user: UserEntityType) => {
         return await repository.addUser(user)
    }    

    const getUserByEmail = async (email: string) =>{
        return await repository.getUserByEmail(email)
    }

    return {
        addUser,
        getUserByEmail,
    }
}

export type UserDbInterface = typeof userDbRepository;