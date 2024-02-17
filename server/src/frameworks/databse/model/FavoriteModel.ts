import mongoose, {Schema, model} from "mongoose";

const favoriteSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

const Favorite = model('Favorite', favoriteSchema);
export default Favorite;