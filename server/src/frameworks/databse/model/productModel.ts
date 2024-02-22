import mongoose, {model, Schema} from "mongoose";

const productSchema = new Schema(
    {
        productName: {
            type: String,
        },
        description: {
            type: String
        },
        age: {
            type: Number
        },
        condition: {
            type: String
        },
        rarity: {
            type: String
        },
        image: {
            type: String
        },
        basePrice: {
            type: Number
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        createdOn: {
            type: Date,
            default: new Date()
        },
        isSold: {
            type: Boolean,
            default: false
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        isAuctioned: {
            type: Boolean,
            default: false
        },
        likes: [
            { 
                user: {
                    type: Schema.Types.ObjectId,
                    ref: "User"
                }
            }
        ],
        comments: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: "User"
                },
                comment: {
                    type: String
                },
                createdOn: {
                    type: Date,
                    default: new Date()
                }
            }
        ],
        favorited: {
            type: Boolean,
            default: false
        }
    }
)

const Product = model('Product', productSchema);
export default Product;