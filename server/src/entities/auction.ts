import { ObjectId } from "mongoose";

export function auction(
    postId: string | ObjectId,
    currentAmount: Number,
    startingDate: Date
) {
    return {
        getPostId: () : string | ObjectId => postId,
        getCurrentAmount: () : Number => currentAmount,
        getStartingDate: () : Date => startingDate
    }
}

export type AuctionEntity = ReturnType<typeof auction>