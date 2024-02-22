import { ObjectId } from "mongoose";
export interface ProductInterface {
    productName: string,
    description: string;
    age: Number;
    condition: string;
    rarity: string;
    image: string,
    userId: string | ObjectId;

}

export interface EditProductInterface {
    productName: string;
    description: string;
    age: Number;
    condition: string;
    rarity: string
}

