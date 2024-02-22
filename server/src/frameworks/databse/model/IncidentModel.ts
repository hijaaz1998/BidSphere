import mongoose, {model, mongo, Schema} from "mongoose";

const incidentSchema = new Schema(
    {
        subject: {
            type: String
        },
        issue: {
            type: String
        },
        createdOn: {
            type: Date,
            default: new Date()
        },
        reportedUser: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        ReportedPost: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Product'
        }
    }
)

const Incidents = model('Incident', incidentSchema);
export default Incidents