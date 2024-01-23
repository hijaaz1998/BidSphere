export interface createUserInterface {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: Number,
    password: string
}

export interface UserInterface {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    following: Array<string>;
}

export interface UserAfterLogin{
    _id: string;
    firstName?: string;
    lastName?: string;
    password: string;
}

