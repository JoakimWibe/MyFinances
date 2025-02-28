<script setup lang="ts">
import { useTransactionStore } from '@/stores/transactionStore';
import { storeToRefs } from 'pinia';
import { useToast } from 'vue-toast-notification';
import { formatDate } from '@/utils/formatDate';
import { onMounted, ref, watch } from 'vue';

const toast = useToast();

const transactionsStore = useTransactionStore();

const { 
  incomes, 
  expenses,
  loadingStates, 
  error,
  selectedBudget,
  budgets
} = storeToRefs(transactionsStore);

const { deleteTransaction, fetchBudgets, selectBudget, fetchTransactions } = transactionsStore;

const selectedOption = ref("")

onMounted(async () => {
   await fetchBudgets()
   selectedOption.value = selectedBudget.value?._id || '';
});

watch(selectedOption, (newSelectedOption) => {
   selectBudget(newSelectedOption);
})

const handleDeleteTransaction = async (transactionId: string, type: 'income' | 'expense') => {
    if (!confirm('Are you sure you want to delete this transaction?')) return;
    
    try {
        await deleteTransaction(transactionId, type);
        await fetchTransactions(selectedBudget.value?._id);
        toast.success('Transaction deleted successfully');
    } catch (error) {
        console.error('Error deleting transaction:', error);
        toast.error('Error deleting transaction');
    }
};

</script>

<template>
    <div class="flex flex-col h-full">
        <div v-if="loadingStates.fetchingTransactions" class="flex items-center justify-center flex-1">
            <i class="pi pi-spin pi-spinner text-4xl text-emerald-500"></i>
        </div>

        <div v-else-if="error" class="flex flex-col items-center justify-center flex-1 gap-4 text-red-500">
            <i class="pi pi-exclamation-circle text-4xl"></i>
            <div class="text-lg font-medium">{{ error }}</div>
        </div>

        <div v-else class="flex flex-col flex-1 overflow-auto  rounded-xl p-6 shadow-md">
        <div class="flex justify-between">
            <select v-model="selectedOption" name="budgets" class="cursor-pointer text-sm font-medium text-gray-600 mb-6">
                <option v-for="budget in budgets" :value="budget._id">{{budget.title}}</option>
            </select>

            <p class="text-sm font-medium text-gray-600">{{ formatDate(selectedBudget!.startDate) }} - {{ formatDate(selectedBudget!.endDate)  }}</p>
        </div>
            
            <div v-if="incomes.length > 0" class="mb-8">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-gray-600">Income Transactions</h3>
                    <span class="text-sm text-gray-500">Transactions: {{ incomes.length }}</span>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div v-for="income in incomes" :key="income._id" 
                         class="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
                        <div class="p-4 flex-grow space-y-2">
                            <div class="flex justify-between items-start">
                                <h4 class="text-lg font-semibold text-gray-800">{{ income.title }}</h4>
                                <span class="text-green-600 font-medium">+{{ income.amount }}kr</span>
                            </div>
                            <div class="flex items-center text-sm text-gray-500">
                                <i class="pi pi-calendar mr-2"></i>
                                <span>{{ formatDate(income.date) }}</span>
                            </div>
                            <div class="flex items-center text-sm text-gray-500">
                                <i class="pi pi-tag mr-2"></i>
                                <span class="capitalize">{{ income.category }}</span>
                            </div>
                            <p v-if="income.description" class="text-sm text-gray-600">{{ income.description }}</p>
                        </div>
                        <div class="border-t border-gray-100 p-3 bg-gray-50">
                            <button @click="handleDeleteTransaction(income._id, 'income')"
                                    class="w-full cursor-pointer flex items-center justify-center text-red-600 hover:text-red-700 text-sm font-medium">
                                <i class="pi pi-trash mr-2"></i>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="expenses.length > 0" class="mb-8">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-gray-600">Expense Transactions</h3>
                    <span class="text-sm text-gray-500">Transactions: {{ expenses.length }}</span>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div v-for="expense in expenses" :key="expense._id" 
                         class="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
                        <div class="p-4 flex-grow space-y-2">
                            <div class="flex justify-between items-start">
                                <h4 class="text-lg font-semibold text-gray-800">{{ expense.title }}</h4>
                                <span class="text-red-600 font-medium">-{{ expense.amount }}kr</span>
                            </div>
                            <div class="flex items-center text-sm text-gray-500">
                                <i class="pi pi-calendar mr-2"></i>
                                <span>{{ formatDate(expense.date) }}</span>
                            </div>
                            <div class="flex items-center text-sm text-gray-500">
                                <i class="pi pi-tag mr-2"></i>
                                <span class="capitalize">{{ expense.category }}</span>
                            </div>
                            <p v-if="expense.description" class="text-sm text-gray-600">{{ expense.description }}</p>
                        </div>
                        <div class="border-t border-gray-100 p-3 bg-gray-50">
                            <button @click="handleDeleteTransaction(expense._id, 'expense')"
                                    class="w-full cursor-pointer flex items-center justify-center text-red-600 hover:text-red-700 text-sm font-medium">
                                <i class="pi pi-trash mr-2"></i>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="incomes.length === 0 && expenses.length === 0" 
                 class="flex flex-col items-center justify-center flex-1 gap-4 text-gray-500">
                <i class="pi pi-inbox text-4xl"></i>
                <div class="text-lg font-medium">No transactions yet</div>
            </div>
        </div>
    </div>
</template>