<script setup lang="ts">
import { useTransactionStore } from '@/stores/transactionStore';
import { storeToRefs } from 'pinia';
import { useToast } from 'vue-toast-notification';
import { formatDate } from '@/utils/formatDate';
import { RouterLink } from 'vue-router';

const toast = useToast();

const transactionsStore = useTransactionStore();
const { deleteBudget, fetchBudgets } = transactionsStore;

const { 
  budgets,
  loadingStates, 
  error,
} = storeToRefs(transactionsStore);

const handleDeleteBudget = async (budgetId: string) => {
    if (!confirm('Are you sure you want to delete this budget?')) return;
    
    try {
        await deleteBudget(budgetId);
        await fetchBudgets();
        toast.success('Budget deleted successfully');
    } catch (error) {
        console.error('Error deleting budget:', error);
        toast.error('Error deleting budget');
    }
};
</script>

<template>
    <div class="flex flex-col h-full">
        <div v-if="loadingStates.fetchingBudgets" class="flex items-center justify-center flex-1">
            <i class="pi pi-spin pi-spinner text-4xl text-emerald-500"></i>
        </div>

        <div v-else-if="error" class="flex flex-col items-center justify-center flex-1 gap-4 text-red-500">
            <i class="pi pi-exclamation-circle text-4xl"></i>
            <div class="text-lg font-medium">{{ error }}</div>
        </div>

        <div v-else class="flex flex-col flex-1 overflow-auto p-4">
            <div v-if="budgets.length > 0" class="mb-8">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-gray-600">Budgets</h3>
                    <span class="text-sm text-gray-500">Budgets: {{ budgets.length }}</span>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div v-for="budget in budgets" :key="budget._id" 
                         class="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
                        <div class="p-4 flex-grow space-y-2">
                            <div class="flex justify-between items-start">
                                <h4 class="text-lg font-semibold text-gray-800">{{ budget.title }}</h4>
                                <span class="text-green-600 font-medium"></span>
                            </div>
                            <div class="flex items-center text-sm text-gray-500">
                                <i class="pi pi-calendar mr-2"></i>
                                <span>{{ formatDate(budget.startDate) }} - {{ formatDate(budget.endDate) }}</span>
                            </div>
                            <p v-if="budget.description" class="text-sm text-gray-600">{{ budget.description }}</p>
                        </div>
                        <div class="border-t flex border-gray-100 p-3 bg-gray-50">
                            <RouterLink class="w-full cursor-pointer flex items-center justify-center text-emerald-500 hover:text-emerald-700 text-sm font-medium" :to="`/budgets/${budget._id}`">Manage</RouterLink>
                            <button @click="handleDeleteBudget(budget._id)"
                                    class="w-full cursor-pointer flex items-center justify-center text-red-600 hover:text-red-700 text-sm font-medium">
                                <i class="pi pi-trash mr-2"></i>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="budgets.length === 0" 
                 class="flex flex-col items-center justify-center flex-1 gap-4 text-gray-500">
                <i class="pi pi-inbox text-4xl"></i>
                <div class="text-lg font-medium">No budgets yet</div>
            </div>
        </div>
    </div>
</template>