import { UserDbInterface } from "../../interfaces/userDbRepository";

export const getUsers = async (
    userRepository: ReturnType<UserDbInterface>
) => {
    return await userRepository.getAllUsers()
}

export const blockUsers = async(
    userId: string,
    userRepository: ReturnType<UserDbInterface>
) => {
    return await userRepository.blockUser(userId)
}

export const removePassword = (object: any) => {
    let {password, ...userWithoutPassword} = object;
    return userWithoutPassword
}

