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

    const getAllUsers = async() => {
        return await repository.getAllUsers();
    }

    const blockUser = async (userId: string) => {
        return await repository.blockUser(userId)
    }

    const getUserSuggestion = async (userId: string) => {
        return await repository.getSuggestion(userId)
    }

    const followUser = async(followed: string, followedBy: string) => {
        
        return await repository.followTheUser(followed, followedBy)
    }
    const addUserByGoogle = async (firstName: string, lastName: string, email: string, jti: string) => {
        return await repository.googleAuth(firstName, lastName, email, jti)
    }

    const unfollowUser = async (logedInUser: string | undefined, unfollowedId: string) => {
        return await repository.unfollowTheUser(logedInUser, unfollowedId)
    }

    const checkEmail = async (email: string) => {
        return await repository.checkEmailIsThere(email);
    }

    const changePassword = async (email: string, password: string) => {
        return await repository.changeThePassword(email, password)
    }

    const getFollowing = async (userId: string | undefined) => {
        return await repository.getFollowingList(userId)
    }

    const getFollowers = async (userId: string | undefined) => {
        return await repository.getFollowersList(userId)
    }

    const getUsersInfo = async (userId: string) => {
        return await repository.getUserInfo(userId)
    }

    return {
        addUser,
        getUserByEmail,
        getAllUsers,
        blockUser,
        getUserSuggestion,
        followUser,
        addUserByGoogle,
        unfollowUser,
        checkEmail,
        changePassword,
        getFollowing,
        getFollowers,
        getUsersInfo
    }
}

export type UserDbInterface = typeof userDbRepository;