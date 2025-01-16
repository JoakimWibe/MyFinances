import { api } from "@/lib/api";
import type { Expense, Income } from "@/types/transaction";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

type NewTransaction = Omit<Income, '_id' | 'createdAt' | 'updatedAt'> & { type: 'income' } | Omit<Expense, '_id' | 'createdAt' | 'updatedAt'> & { type: 'expense' };

export const useTransactionStore = defineStore('transactions', () => {
    const incomes = ref<Income[]>([])
    const expenses = ref<Expense[]>([])
    const isLoading = ref(false);
    const isAdding = ref(false);
    const isDeleting = ref(false);
    const error = ref<string | null>(null);

    const fetchTransactions = async () => {
        isLoading.value = true;
        
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
            isLoading.value = false;
        }
    };

    const addTransaction = async (newTransaction: NewTransaction) => {
        isAdding.value = true;
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
            error.value = err instanceof Error ? err.message : 'Failed to add transaction';
            throw error.value;
        } finally {
            isAdding.value = false;
        }
    };

    const deleteTransaction = async (id: string, type: 'income' | 'expense') => {
        isDeleting.value = true;
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
            isDeleting.value = false;
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
        isLoading,
        isAdding,
        isDeleting,
        error,
        fetchTransactions,
        addTransaction,
        deleteTransaction,
        totalIncome,
        totalExpenses,
        balance,
    };
});