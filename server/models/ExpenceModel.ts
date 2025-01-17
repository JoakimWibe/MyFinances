import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    amount: {
        type: Number,
        required: true,
        trim: true
    },
    type: {
        type: String,
        default: "expense"
    },
    date: {
        type: Date,
        required: true,
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    budgetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Budget',
        required: false
    }
}, {timestamps: true});

export default mongoose.model("Expense", ExpenseSchema);