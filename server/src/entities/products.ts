    import { ObjectId } from "mongoose"
export  function productBeforeAuction(
    productName: string,
    description: string,
    age: Number,
    condition: string,
    rarity: string,
    image: string,
    userId: string | ObjectId
) {
    return {
        getProductName: () : string => productName,
        getDescription: () : string => description,
        getAge: () : Number => age,
        getCondition: () : string => condition,
        getRarity: () : string => rarity,
        getImage: () : string => image,
        getUserId: () : string | ObjectId => userId 
    }
}

export  function editPost(
    productName: string,
    description: string,
    age: Number,
    condition: string,
    rarity: string,
) {
    return {
        getProductName: () : string => productName,
        getDescription: () : string => description,
        getAge: () : Number => age,
        getCondition: () : string => condition,
        getRarity: () : string => rarity
    }
}

export type EditPostEntity = ReturnType<typeof editPost>
export type ProductEntityType = ReturnType<typeof productBeforeAuction >