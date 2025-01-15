<script setup lang="ts">
import { useTransactionStore } from '@/stores/transactionStore';
import { storeToRefs } from 'pinia';
const transactionsStore = useTransactionStore();

const { 
  balance,
  totalIncome,
  totalExpenses,
} = storeToRefs(transactionsStore);
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div>
            <h3 class="text-sm text-gray-500 mb-2">Total Balance</h3>
            <p class="text-xl" :class="balance > 0 ? 'text-green-600' : 'text-red-600'">{{ balance }}kr</p>
        </div>
        <div>
            <h3 class="text-sm text-gray-500 mb-2">Total Income</h3>
            <p class="text-xl">{{ totalIncome }}kr</p>
        </div>
        <div>
            <h3 class="text-sm text-gray-500 mb-2">Total Expenses</h3>
            <p class="text-xl">{{ totalExpenses }}kr</p>
        </div>
    </div>
</template>