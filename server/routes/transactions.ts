import { addExpense, getExpenses, deleteExpense, getExpenseById } from '../controllers/expensesController';
import { addIncome, deleteIncome, getIncomeById, getIncomes } from '../controllers/incomesController';
import { Router } from 'express';

const router = Router();

router.post('/incomes', addIncome)
    .get('/incomes', getIncomes)
    .delete('/incomes/:id', deleteIncome)
    .get('/incomes/:id', getIncomeById)
    .post('/expenses', addExpense)
    .get('/expenses', getExpenses)
    .delete('/expenses/:id', deleteExpense)
    .get('/expenses/:id', getExpenseById);

export default router;