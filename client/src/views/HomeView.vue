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
    <section class="p-4 md:p-8 gap-8 flex flex-col bg-slate-100 min-h-screen">
        <h1 class="text-3xl font-bold text-primary-700">Dashboard</h1>

        <Balance />

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RecentTransactions />
            <ExpensesByCategory />
        </div>
    </section>
</template>
