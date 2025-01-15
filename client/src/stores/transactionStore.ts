import { api } from "@/lib/api";
import type { Expense, Income } from "@/types/transaction";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useTransactionStore = defineStore('transactions', () => {
    const incomes = ref<Income[]>([])
    const expenses = ref<Expense[]>([])
    const loading = ref(false);
    const error = ref<string | null>(null);

    const fetchTransactions = async () => {
        loading.value = true;
        
        try {
            const [incomesResponse, expensesResponse] = await Promise.all([
                api.get<Income[]>('/incomes'),
                api.get<Expense[]>('/expenses')
            ]);

            incomes.value = incomesResponse.data;
            expenses.value = expensesResponse.data;
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to fetch transactions';
            throw error.value;
        } finally {
            loading.value = false;
        }
    };

    const addIncome = async (newIncome: Omit<Income, '_id' | 'createdAt' | 'updatedAt'>) => {
        loading.value = true;

        try {
            const { data } = await api.post<{ message: string, income: Income }>('/incomes', newIncome);
            incomes.value.push(data.income);
            return data.income;
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to add income';
            throw error.value;
        } finally {
            loading.value = false;
        }
    };

    const addExpense = async (newExpense: Omit<Expense, '_id' | 'createdAt' | 'updatedAt'>) => {
        loading.value = true;

        try {
            const { data } = await api.post<{ message: string, expense: Expense }>('/expenses', newExpense);
            expenses.value.push(data.expense);
            return data.expense;
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to add expense';
            throw error.value;
        } finally {
            loading.value = false;
        }
    };

    const deleteIncome = async (id: string) => {
        loading.value = true;

        try {
            await api.delete(`/incomes/${id}`);
            incomes.value = incomes.value.filter(income => income._id !== id);
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to delete income';
            throw error.value;
        } finally {
            loading.value = false;
        }
    };

    const deleteExpense = async (id: string) => {
        loading.value = true;

        try {
            await api.delete(`/expenses/${id}`);
            expenses.value = expenses.value.filter(expense => expense._id !== id);
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to delete expense';
            throw error.value;
        } finally {
            loading.value = false;
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
        loading,
        error,
        fetchTransactions,
        addIncome,
        addExpense,
        deleteIncome,
        deleteExpense,
        totalIncome,
        totalExpenses,
        balance,
    };
});