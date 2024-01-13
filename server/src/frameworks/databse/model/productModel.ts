import mongoose, {model, mongo, Schema} from "mongoose";

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
            type: mongoose.Types.ObjectId,
            require: true,
            ref: 'users'
        },
        createdOn: {
            type: Date,
            default: new Date()
        },
        isSold: {
            type: Boolean,
        },
        isDeleted: {
            type: Boolean
        },
        likes: [
            { 
                user: {
                    type: Schema.Types.ObjectId,
                    ref: "users"
                }
            }
        ],
        comments: [
            {
                user: {
                    type: mongoose.Types.ObjectId,
                    ref: "users"
                },
                coomment: {
                    type: String
                }
            }
        ]
    }
)

const Product = model('Product', productSchema);
export default Product;