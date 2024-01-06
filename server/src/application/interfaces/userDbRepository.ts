import { ObjectId } from "mongoose";
import { UserRepositoryMongoDb } from "../../frameworks/databse/repositories/userRepositoryMongoDb";
import { UserEntityType } from "../../entities/user";

export const userDbRepository = (
    repository: ReturnType<UserRepositoryMongoDb>
    ) => {
    const addUser = async (user: UserEntityType) => {
        await repository.addUser(user)
    }

    const findUserByEmail = async (email: string) =>{
        const user: any = await repository.getUserByEmail(email)
        return user;
    }

    return {
        addUser,
        findUserByEmail,
    }
}

export type UserDbInterface = typeof userDbRepository;