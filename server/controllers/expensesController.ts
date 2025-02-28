import { Request, Response } from 'express';
import ExpenseSchema from "../models/ExpenceModel";
import BudgetSchema from "../models/BudgetModel";

export const addExpense = async (req: Request, res: Response) => {
    const { title, amount, date, category, description, budgetId } = req.body;

    if (budgetId) {
        const budget = await BudgetSchema.findById(budgetId);
        if (!budget) {
            return res.status(404).json({ message: "Budget not found" });
        }
    }

    const expense = new ExpenseSchema({
        title,
        amount,
        date,
        category,
        description,
        budgetId
    });

    try {
        if (!title || !date || !category || !description) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (amount <= 0 || !Number.isInteger(amount)) {
            return res.status(400).json({ message: 'Amount must be a positive number' });
        }

        await expense.save();
        res.status(201).json({ message: 'Expense added successfully', expense });
    } catch (error) {
        res.status(500).json({ message: 'Error adding expense', error });
    }
};

export const getExpenses = async (req: Request, res: Response) => {
    try {
        const query = req.query.budgetId ? { budgetId: req.query.budgetId } : {};
        const expenses = await ExpenseSchema.find(query).sort({createdAt: -1});
        res.status(200).json(expenses || []);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching expenses', error });
    }
};

export const getExpenseById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const expense = await ExpenseSchema.findById(id);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching expense', error });
    }
}

export const deleteExpense = async (req: Request, res: Response) => {
    const { id } = req.params;
    ExpenseSchema.findByIdAndDelete(id).then(() => {
        res.status(200).json({ message: 'Expense deleted successfully' });
    }).catch((error) => {
        res.status(500).json({ message: 'Error deleting expense', error });
    });
};