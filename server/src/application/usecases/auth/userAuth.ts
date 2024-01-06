import { UserInterface } from "../../../types/userInterface";
import { AuthServiceInterface } from "../../services/authServiceInterface";
import { UserDbInterface } from "../../interfaces/userDbRepository";
import { Types } from "mongoose";
import createUserEntity, { UserEntityType } from "../../../entities/user";

export const userRegister = async (
    user: UserInterface,
    userRepository: ReturnType<UserDbInterface>,
    authService: ReturnType<AuthServiceInterface>
) => {

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

    const applicantId: Types.ObjectId = createdUser?._id;

    const token = authService.generateToken(createdUser?._id.toString());
    return { token, applicantId }
    
}

export const userLogin = async (
    email: string,
    password: string,
    userRepository: ReturnType<UserDbInterface>,
    authService: ReturnType<AuthServiceInterface>
) => {
    const user: any = await userRepository.findUserByEmail(email)
    console.log(user);
    
    return { firstName: user.firstName, lastName: user.lastName }
}

