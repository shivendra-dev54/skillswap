import mongoose, { Schema, Document } from "mongoose";

interface Skill extends Document {
    name: string;
    usersHaving: string[];        // array of user IDs (or usernames)
    usersWantToLearn: string[];   // array of user IDs (or usernames)
}

const SkillModel= new Schema<Skill>({
    name: { 
        type: String, 
        required: true, 
        unique: true 
    },
    usersHaving: { 
        type: [String], 
        default: [] 
    },
    usersWantToLearn: { 
        type: [String], 
        default: [] 
    }
});

export default mongoose.models.Skill || mongoose.model<Skill>("Skill", SkillModel);
