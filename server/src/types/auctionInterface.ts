import { ObjectId } from "mongoose";

export interface   AuctionInterface {
    postId: string | ObjectId;
    currentAmount: Number;
    startingDate: Date;
}