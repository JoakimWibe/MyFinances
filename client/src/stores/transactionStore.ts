import { api } from "@/lib/api";
import type { Budget, Expense, Income, NewBudget, NewTransaction } from "@/types/transaction";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useTransactionStore = defineStore('transactions', () => {
    const incomes = ref<Income[]>([])
    const expenses = ref<Expense[]>([])
    const budgets = ref<Budget[]>([])
    const selectedBudgetId = ref<string | null>(null);
    const error = ref<string | null>(null);

    const loadingStates = ref({
        fetchingTransactions: false,
        fetchingBudgets: false,
        addingTransaction: false,
        deletingTransaction: false,
        addingBudget: false,
        deletingBudget: false
    });

    const selectedBudget = computed(() => 
        selectedBudgetId.value ? budgets.value.find(budget => budget._id === selectedBudgetId.value) : null
    );

    const fetchBudgets = async () => {
        loadingStates.value.fetchingBudgets = true;
        try {
            const response = await api.get<Budget[]>('/budgets');
            budgets.value = response.data;
            
            if (!selectedBudgetId.value && response.data.length > 0) {
                selectBudget(response.data[0]._id);
            }
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to fetch budgets';
            throw error.value;
        } finally {
            loadingStates.value.fetchingBudgets = false;
        }
    };

    const selectBudget = async (budgetId: string) => {
        selectedBudgetId.value = budgetId;
        await fetchTransactions(budgetId);
    };

    const addBudget = async (newBudget: NewBudget) => {
        loadingStates.value.addingBudget = true;
        try {
            const response = await api.post<Budget>('/budgets', newBudget);
            budgets.value = [response.data, ...budgets.value];
            
            if (budgets.value.length === 1) {
                selectBudget(response.data._id);
            }
            return response.data;
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to add budget';
            throw error.value;
        } finally {
            loadingStates.value.addingBudget = false;
        }
    };

    const deleteBudget = async (id: string) => {
        loadingStates.value.deletingBudget = true;
        try {
            await api.delete(`/budgets/${id}`);
            budgets.value = budgets.value.filter(budget => budget._id !== id);
            
            if (selectedBudgetId.value === id) {
                if (budgets.value.length > 0) {
                    selectBudget(budgets.value[0]._id);
                } else {
                    selectedBudgetId.value = null;
                }
            }
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to delete budget';
            throw error.value;
        } finally {
            loadingStates.value.deletingBudget = false;
        }
    };

    const fetchTransactions = async (budgetId?: string) => {
        loadingStates.value.fetchingTransactions = true;
        
        try {
            const [incomesResponse, expensesResponse] = await Promise.all([
                api.get<Income[]>(`/incomes${budgetId ? `?budgetId=${budgetId}` : ''}`),
                api.get<Expense[]>(`/expenses${budgetId ? `?budgetId=${budgetId}` : ''}`)
            ]);

            incomes.value = incomesResponse.data;
            expenses.value = expensesResponse.data;
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to fetch transactions';
            throw error.value;
        } finally {
            loadingStates.value.fetchingTransactions = false;
        }
    };

    const addTransaction = async (transaction: NewTransaction) => {
        loadingStates.value.addingTransaction = true;
        const endpoint = transaction.type === 'income' ? '/incomes' : '/expenses';

        try {
            const { data } = await api.post<{ message: string, income?: Income, expense?: Expense }>(endpoint, transaction);
            const newTransaction = transaction.type === 'income' ? data.income : data.expense;
            
            if (!newTransaction) {
                throw new Error(`No ${transaction.type} data received from server`);
            }
            
            if (transaction.type === 'income') {
                incomes.value.push(newTransaction as Income);
            } else {
                expenses.value.push(newTransaction as Expense);
            }
            
            return newTransaction;
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to add transaction';
            throw error.value;
        } finally {
            loadingStates.value.addingTransaction = false;
        }
    };

    const deleteTransaction = async (id: string, type: 'income' | 'expense') => {
        loadingStates.value.deletingTransaction = true;
        const endpoint = type === 'income' ? `/incomes/${id}` : `/expenses/${id}`;

        try {
            await api.delete(endpoint);
            
            if (type === 'income') {
                incomes.value = incomes.value.filter(income => income._id !== id);
            } else {
                expenses.value = expenses.value.filter(expense => expense._id !== id);
            }
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to delete transaction';
            throw error.value;
        } finally {
            loadingStates.value.deletingTransaction = false;
        }
    };

    const totalIncome = computed(() => 
        incomes.value.reduce((total, income) => total + income.amount, 0)
    );

    const totalExpenses = computed(() => 
        expenses.value.reduce((sum, expense) => sum + expense.amount, 0)
    );

    const balance = computed(() => totalIncome.value - totalExpenses.value);

    return {
        incomes,
        expenses,
        budgets,
        selectedBudgetId,
        selectedBudget,
        loadingStates,
        error,
        fetchTransactions,
        fetchBudgets,
        selectBudget,
        addBudget,
        deleteBudget,
        addTransaction,
        deleteTransaction,
        totalIncome,
        totalExpenses,
        balance
    }
});