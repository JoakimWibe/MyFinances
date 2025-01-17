import { Request, Response } from 'express';
import BudgetSchema from "../models/BudgetModel";

export const addBudget = async (req: Request, res: Response) => {
    const { title, description, startDate, endDate } = req.body;

    const budget = new BudgetSchema({
        title,
        description,
        startDate,
        endDate
    });

    try {
        if (!title || !description || !startDate || !endDate) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        await budget.save();
        res.status(201).json({ message: 'Budget created successfully', budget });
    } catch (error) {
        res.status(500).json({ message: 'Error creating budget', error });
    }
};

export const getBudgets = async (req: Request, res: Response) => {
    try {
        const budgets = await BudgetSchema.find().sort({createdAt: -1});
        res.status(200).json(budgets || []);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching budgets', error });
    }
};

export const getBudget = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const budget = await BudgetSchema.findById(id);
        if (!budget) {
            return res.status(404).json({ message: 'Budgwet not found' });
        }
        res.status(200).json(budget);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching budget', error });
    }
}

export const deleteBudget = async (req: Request, res: Response) => {
    const { id } = req.params;
    BudgetSchema.findByIdAndDelete(id).then(() => {
        res.status(200).json({ message: 'Budget deleted successfully' });
    }).catch((error) => {
        res.status(500).json({ message: 'Error deleting budget', error });
    });
};