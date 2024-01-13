import { ObjectId } from "mongoose"
export default function productBeforeAuction(
    productName: string,
    image: string,
    userId: string | ObjectId
) {
    return {
        getProductName: () : string => productName,
        getImage: () : string => image,
        getUserId: () : string | ObjectId => userId 
    }
}

export type ProductEntityType = ReturnType<typeof productBeforeAuction >