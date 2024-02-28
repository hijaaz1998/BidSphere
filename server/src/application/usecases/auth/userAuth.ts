import { UserInterface, createUserInterface, UserAfterLogin, updateInterface } from "../../../types/userInterface";
import { AuthServiceInterface } from "../../services/authServiceInterface";
import { UserDbInterface, userDbRepository } from "../../interfaces/userDbRepository";
import { Types } from "mongoose";
import { HttpStatus } from "../../../types/httpStatus";
import createUserEntity, { UserEntityType } from "../../../entities/user";
import AppError from "../../../utils/middleware/appError";
import { removePassword } from "../user/read";
import { userRepositoryMongoDb } from "../../../frameworks/databse/repositories/userRepositoryMongoDb";

export const userRegister = async (
    user: UserInterface,
    userRepository: ReturnType<UserDbInterface>,
    authService: ReturnType<AuthServiceInterface>
) => {

    user.email = user?.email.toLocaleLowerCase();

    const isExistingEmail = await userRepository.getUserByEmail(user?.email)

    if(isExistingEmail){
        return new AppError('Email already exists', HttpStatus.UNAUTHORIZED)
    }

    user.password = await authService.encryptPassword(user?.password);
    const { firstName, lastName, email, phoneNumber, password } = user;
    const userEntity: UserEntityType = createUserEntity(
        firstName,
        lastName,
        email,
        phoneNumber,
        password
    );

    console.log(userEntity.getFirstName());

    const createdUser: any = await userRepository.addUser(userEntity)

    const token = authService.generateToken(createdUser?._id.toString());
    return { token, createdUser }
    
}

export const profileUpdate = async (
    userRepository: ReturnType<UserDbInterface>,
    data: updateInterface,
    userId: string | undefined
) => {

    const updated = userRepository.updateProfile(data, userId)

    return updated

}

export const userLogin = async (
    email: string,
    password: string,
    userRepository: ReturnType<UserDbInterface>,
    authService: ReturnType<AuthServiceInterface>
) => {
    const user: any = await userRepository.getUserByEmail(email)    
    
    if(!user){
        return new AppError('This user doesnt exist', HttpStatus.UNAUTHORIZED)
    }

    const isPasswordCorrect = await authService.comparePassword(
        password,
        user.password
    )

    if(!isPasswordCorrect){
        return new AppError('Invalid email or password', HttpStatus.UNAUTHORIZED)
    }

    const userDetails = removePassword(user)
    const token = authService.generateToken(JSON.stringify(userDetails._id))    

    return {token, userDetails}
    
}

export const getUserSuggestion = async (
    userRepository: ReturnType<UserDbInterface>,
    userId: any
) => {
    const data = await userRepository.getUserSuggestion(userId);
    return data
}


export const followTheUser = async (
    userRepository: ReturnType<UserDbInterface>,
    followed: string,
    followedBy: string
) => {
   
    
    const data = await userRepository.followUser(followed, followedBy)
    if(data){
        return data
    }
}

export const googleAuthRegister = async (
    firstName: string, lastName: string, email: string, jti: string,
    userRepository: ReturnType<UserDbInterface>,
    authService: ReturnType<AuthServiceInterface>
) => {
    const user: any = await userRepository.addUserByGoogle(firstName,lastName, email, jti);


    console.log("user",user);
    

    const token = authService.generateToken(JSON.stringify(user?._id));

    return {token, user}
}

export const unfollowTheUser = async (
    userRepository: ReturnType<UserDbInterface>,
    logedInUser: string | undefined,
    unfollowedId: string
) => {
    const res = await userRepository.unfollowUser(logedInUser, unfollowedId);

    return res
}

export const checkEmail = async (
    userRepository: ReturnType<UserDbInterface>,
    email: string
) => {
    const check = await userRepository.checkEmail(email)

    return check
}

export const changeThePassword = async (
    userRepository: ReturnType<UserDbInterface>,
    authService: ReturnType<AuthServiceInterface>,
    email: string,
    password: string
) => {
    const encrypted = await authService.encryptPassword(password);

    const updated = await userRepository.changePassword(email, encrypted);

    return updated
}

export const getFollowingList = async (
    userRepository: ReturnType<UserDbInterface>,
    userId: string | undefined
) => {
    const following = await userRepository.getFollowing(userId);

    return following
}

export const getFollowersList = async (
    userRepository: ReturnType<UserDbInterface>,
    userId: string | undefined
) => {
    const followers = await userRepository.getFollowers(userId);

    return followers;
}

export const getUserInfo = async (
    userRepository: ReturnType<UserDbInterface>,
    userId: string
) => {
    const user = await userRepository.getUsersInfo(userId)

    return user
}

export const userSearch = async (
    userRepository: ReturnType<UserDbInterface>,
    userId: string | undefined,
    search: string
) => {
    const result = await userRepository.searchUser(userId, search);

    return result
}

export const getFavorites = async (
    userRepository: ReturnType<UserDbInterface>,
    userId: string
) => {
    const favorites = await userRepository.getFavorite(userId)
    return favorites
}