import { addExpense, getExpenses, deleteExpense, getExpenseById } from '../controllers/expensesController';
import { addIncome, deleteIncome, getIncomeById, getIncomes } from '../controllers/incomesController';
import { Router } from 'express';

const router = Router();

router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .get('/get-income/:id', getIncomeById)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpenses)
    .delete('/delete-expense/:id', deleteExpense)
    .get('/get-expense/:id', getExpenseById);

export default router;