import { api } from "@/lib/api";
import type { Expense, Income } from "@/types/transaction";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

type NewTransaction = Omit<Income, '_id' | 'createdAt' | 'updatedAt'> & { type: 'income' } | Omit<Expense, '_id' | 'createdAt' | 'updatedAt'> & { type: 'expense' };

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

    const addTransaction = async (newTransaction: NewTransaction) => {
        loading.value = true;
        const endpoint = newTransaction.type === 'income' ? '/incomes' : '/expenses';

        try {
            const { data } = await api.post<{ message: string, income?: Income, expense?: Expense }>(endpoint, newTransaction);
            const transaction = newTransaction.type === 'income' ? data.income : data.expense;
            
            if (!transaction) {
                throw new Error(`No ${newTransaction.type} data received from server`);
            }
            
            if (newTransaction.type === 'income') {
                incomes.value.push(transaction as Income);
            } else {
                expenses.value.push(transaction as Expense);
            }
            
            return transaction;
        } catch (err) {
            error.value = err instanceof Error ? err.message : `Failed to add ${newTransaction.type}`;
            throw error.value;
        } finally {
            loading.value = false;
        }
    };

    const deleteTransaction = async (id: string, type: 'income' | 'expense') => {
        loading.value = true;
        const endpoint = type === 'income' ? '/incomes' : '/expenses';

        try {
            await api.delete(`${endpoint}/${id}`);
            if (type === 'income') {
                incomes.value = incomes.value.filter(income => income._id !== id);
            } else {
                expenses.value = expenses.value.filter(expense => expense._id !== id);
            }
        } catch (err) {
            error.value = err instanceof Error ? err.message : `Failed to delete ${type}`;
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
        addTransaction,
        deleteTransaction,
        totalIncome,
        totalExpenses,
        balance,
    };
});