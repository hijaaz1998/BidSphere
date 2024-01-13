import { ObjectId } from "mongoose";
export interface ProductBeforeAuctionInterface {
    productName: string,
    image: string,
    userId: string | ObjectId;
}

