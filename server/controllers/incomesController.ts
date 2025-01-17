import { Request, Response } from 'express';
import IncomeSchema from "../models/IncomeModel";
import BudgetSchema from "../models/BudgetModel";

export const addIncome = async (req: Request, res: Response) => {
    const { title, amount, date, category, description, budgetId } = req.body;

    if (budgetId) {
        const budget = await BudgetSchema.findById(budgetId);
        if (!budget) {
            return res.status(404).json({ message: "Budget not found" });
        }
    }

    const income = new IncomeSchema({
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

        await income.save();
        res.status(201).json({ message: 'Income added successfully', income });
    } catch (error) {
        res.status(500).json({ message: 'Error adding income', error });
    }
};

export const getIncomes = async (req: Request, res: Response) => {
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1});
        res.status(200).json(incomes || []);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching incomes', error });
    }
};

export const getIncomeById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const income = await IncomeSchema.findById(id);
        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching income', error });
    }
}

export const deleteIncome = async (req: Request, res: Response) => {
    const { id } = req.params;
    IncomeSchema.findByIdAndDelete(id).then(() => {
        res.status(200).json({ message: 'Income deleted successfully' });
    }).catch((error) => {
        res.status(500).json({ message: 'Error deleting income', error });
    });
};