<script setup lang="ts">
import { useTransactionStore } from '@/stores/transactionStore';
import { storeToRefs } from 'pinia';
const transactionsStore = useTransactionStore();

const { 
  incomes, 
  expenses,
  loadingStates,
  error, 
} = storeToRefs(transactionsStore);
</script>

<template>
    <div class="gap-8 flex flex-col bg-white h-[500px] overflow-y-auto p-4 shadow-md rounded">
        <div v-if="loadingStates.fetchingTransactions" class="flex items-center justify-center h-full">
            <i class="pi pi-spin pi-spinner text-4xl text-emerald-500"></i>
        </div>

        <div v-else-if="error" class="flex flex-col items-center justify-center h-full gap-4 text-red-500">
            <i class="pi pi-exclamation-circle text-4xl"></i>
            <div class="text-lg font-medium">{{ error }}</div>
        </div>

        <div v-else>
            <div v-if="incomes.length > 0">
                <h3 class="text-sm font-medium text-gray-600 mb-3">Recent Incomes</h3>
                <div class="space-y-2">
                    <div v-for="income in incomes.slice(0, 3)" :key="income._id" 
                         class="flex justify-between items-center p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                        <div class="flex items-center gap-3">
                            <div class="p-2 bg-emerald-100 rounded-lg">
                                <i class="pi pi-arrow-up text-emerald-500"></i>
                            </div>
                            <span class="font-medium text-gray-800">{{ income.title }}</span>
                        </div>
                        <span class="font-medium text-emerald-500">+{{ income.amount }}kr</span>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="expenses.length > 0">
            <h3 class="text-sm font-medium text-gray-600 mb-3">Recent Expenses</h3>
            <div class="space-y-2">
                <div v-for="expense in expenses.slice(0, 3)" :key="expense._id" 
                     class="flex justify-between items-center p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div class="flex items-center gap-3">
                        <div class="p-2 bg-red-100 rounded-lg">
                            <i class="pi pi-arrow-down text-red-500"></i>
                        </div>
                        <span class="font-medium text-gray-800">{{ expense.title }}</span>
                    </div>
                    <span class="font-medium text-red-500">-{{ expense.amount }}kr</span>
                </div>
            </div>
        </div>

        <div v-if="incomes.length === 0 && expenses.length === 0 && !loadingStates.fetchingTransactions && !error" 
             class="flex flex-col items-center justify-center flex-1 gap-4 text-gray-500">
            <i class="pi pi-inbox text-4xl"></i>
            <div class="text-lg font-medium">No transactions yet</div>
        </div>
    </div>
</template>