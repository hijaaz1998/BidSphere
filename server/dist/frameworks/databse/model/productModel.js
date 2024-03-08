"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
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
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "User"
            }
        }
    ],
    comments: [
        {
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
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
    },
    reportCount: {
        type: Number,
        default: 0
    },
    isBlocked: {
        type: Boolean,
        default: false
    }
});
const Product = (0, mongoose_1.model)('Product', productSchema);
exports.default = Product;
