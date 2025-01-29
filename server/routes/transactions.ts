import { addBudget, deleteBudget, editBudget, getBudget, getBudgets } from '../controllers/budgetController';
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
    .get('/expenses/:id', getExpenseById)
    .post('/budgets', addBudget)
    .put('/budgets/:id', editBudget)
    .get('/budgets', getBudgets)
    .delete('/budgets/:id', deleteBudget)
    .get('/budgets/:id', getBudget);

export default router;