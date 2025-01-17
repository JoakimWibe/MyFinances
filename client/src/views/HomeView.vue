<script setup lang="ts">
import RecentTransactions from '../components/RecentTransactions.vue'
import ExpensesByCategory from '../components/ExpensesByCategory.vue'
import Balance from '../components/Balance.vue'
import { onMounted } from 'vue';
import { useTransactionStore } from '@/stores/transactionStore';

const transactionsStore = useTransactionStore();
const { fetchTransactions } = transactionsStore;

onMounted(fetchTransactions)
</script>

<template>
    <section class="p-4 md:p-8 gap-8 flex flex-col bg-slate-50 min-h-screen">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div>
                <h1 class="text-2xl font-bold text-gray-800">Dashboard</h1>
                <p class="text-gray-500 mt-1">Track your finances</p>
            </div>
        </div>

        <Balance />

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="bg-white rounded-xl shadow-md overflow-hidden">
                <div class="p-4 border-b border-gray-100">
                    <h2 class="text-lg font-semibold text-gray-800">Recent Transactions</h2>
                </div>
                <RecentTransactions />
            </div>
            
            <div class="bg-white rounded-xl shadow-md overflow-hidden">
                <div class="p-4 border-b border-gray-100">
                    <h2 class="text-lg font-semibold text-gray-800">Expenses by Category</h2>
                </div>
                <ExpensesByCategory />
            </div>
        </div>
    </section>
</template>
