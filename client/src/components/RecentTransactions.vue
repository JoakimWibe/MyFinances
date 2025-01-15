<script setup lang="ts">
import { useTransactionStore } from '@/stores/transactionStore';
import { storeToRefs } from 'pinia';
const transactionsStore = useTransactionStore();

const { 
  incomes, 
  expenses,
  loading, 
  error, 
} = storeToRefs(transactionsStore);
</script>

<template>
    <div class="gap-8 flex flex-col bg-white h-[500px] overflow-y-auto p-4 shadow-md rounded">
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">{{ error }}</div>

        <div v-else>
            <h2 class="text-xl font-bold text-gray-800 mb-8">Recent Transactions</h2>
            <div v-if="incomes.length > 0">
                <h3 class="text-sm text-gray-500 mb-2">Recent Incomes</h3>
                <div class="space-y-2">
                    <div v-for="income in incomes.slice(0, 5)" :key="income._id" 
                         class="flex justify-between items-center p-2 bg-white rounded shadow">
                        <span>{{ income.title }}</span>
                        <span class="text-green-600">+{{ income.amount }}kr</span>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="expenses.length > 0">
            <h3 class="text-sm text-gray-500 mb-2">Recent Expenses</h3>
            <div class="space-y-2">
                <div v-for="expense in expenses.slice(0, 5)" :key="expense._id" 
                     class="flex justify-between items-center p-2 bg-white rounded shadow">
                    <span>{{ expense.title }}</span>
                    <span class="text-red-600">-{{ expense.amount }}kr</span>
                </div>
            </div>
        </div>

        <div v-if="incomes.length === 0 && expenses.length === 0" 
             class="text-center text-gray-500">
            No transactions yet
        </div>
    </div>
</template>