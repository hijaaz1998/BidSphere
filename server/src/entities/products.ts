export default function postBeforeAuction(
    productName: string,
    image: string
) {
    return {
        getProductName: () : string => productName,
        getImage: () : string => image
    }
}