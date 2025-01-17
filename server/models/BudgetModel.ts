import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
        required: true
    }
}, {timestamps: true});

export default mongoose.model("Budget", BudgetSchema);