import mongoose,{Document,Model} from "mongoose";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants";
interface IJobs extends Document   {
    company: string;
    position: string;
    jobStatus: "interview" | "declined" | "pending";
    jobType: "full-time" | "part-time" | "internship";
    jobLocation: string;
    createdBy: any;
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
        enum: Object.values(JOB_STATUS),
        default: "pending"
    },
    jobType: {
        type: String,
        enum: Object.values(JOB_TYPE),
        default: 'full-time',
    },
    jobLocation: {
        type: String,
        default: 'my city',
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
}
)

const jobModel: Model<IJobs> = mongoose.model<IJobs>("Job", jobSchema);
export default jobModel