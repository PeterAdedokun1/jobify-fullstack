import mongoose,{Document,Model} from "mongoose";

interface IJobs extends Document   {
    company: string;
    position: string;
    jobStatus: "interview" | "declined" | "pending";
    jobType: "full-time" | "part-time" | "internship";
    jobLocation: string;
}

const jobSchema = new mongoose.Schema<IJobs>({
    company: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    jobStatus: {
        type: String,
        enum: ["interview", "declined", "pending"],
        default: "pending"
    },
    jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'internship'],
        default: 'full-time',
    },
    jobLocation: {
        type: String,
        default: 'my city',
    },
}, {
    timestamps: true
}
)

const jobModel: Model<IJobs> = mongoose.model<IJobs>("Job", jobSchema);
export default jobModel