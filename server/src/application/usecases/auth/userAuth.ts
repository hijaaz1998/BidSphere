import { UserInterface, createUserInterface } from "../../../types/userInterface";
import { AuthServiceInterface } from "../../services/authServiceInterface";
import { UserDbInterface } from "../../interfaces/userDbRepository";
import { Types } from "mongoose";
import createUserEntity, { UserEntityType } from "../../../entities/user";

export const userRegister = async (
    user: UserInterface,
    userRepository: ReturnType<UserDbInterface>,
    authService: ReturnType<AuthServiceInterface>
) => {

    user.email = user?.email.toLocaleLowerCase();

    const isExistingEmail = await userRepository.getUserByEmail(user?.email)

    if(isExistingEmail){
        throw new Error('user already exists')
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

export const userLogin = async (
    email: string,
    password: string,
    userRepository: ReturnType<UserDbInterface>,
    authService: ReturnType<AuthServiceInterface>
) => {
    const user: createUserInterface | null = await userRepository.getUserByEmail(email)
    
    if(!user){
        throw new Error ("This user doesent exist") 
    }

    const isPasswordCorrect = await authService.comparePassword(
        password,
        user.password
    )

    if(!isPasswordCorrect){
        throw new Error ('Password or email is incorrect')
    }

    const token = authService.generateToken(JSON.stringify(user))
    return {token, user}
    
}

