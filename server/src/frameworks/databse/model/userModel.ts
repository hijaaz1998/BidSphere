import mongoose, {Schema, model} from "mongoose";

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            maxLength: 32
        },
        lastName: {
            type: String,
            maxLength: 32,
        },
        phoneNumber: {
            type: Number,
            maxlength: 10,
        },
        email: {
            type: String,
            unique: true,
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please add a valid email'],
        },
        password: {
            type: String,
            trim: true,
        },
        isBlocked: {
            type: Boolean,
            default: false
        },
        followers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        following: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        jti: {
            type: String
        },
        image: {
            type: String
        }
    },
    
    {timestamps: true}
)

const User = model('User', userSchema);
export default User;