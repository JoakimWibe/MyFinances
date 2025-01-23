<script setup lang="ts">
import { useTransactionStore } from '@/stores/transactionStore';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
const transactionsStore = useTransactionStore();

const { selectBudget, fetchBudgets } = transactionsStore;

const { 
  balance,
  totalIncome,
  totalExpenses,
  budgets,
  selectedBudget
} = storeToRefs(transactionsStore);

const selectedOption = ref("")

onMounted(async () => {
   await fetchBudgets()
   selectedOption.value = selectedBudget.value?._id || '';
});

watch(selectedOption, (newSelectedOption) => {
   selectBudget(newSelectedOption);
})
</script>

<template>
    <div class="bg-white rounded-xl p-6 shadow-md">
        <select v-model="selectedOption" name="budgets" class="cursor-pointer text-sm font-medium text-gray-600 mb-6">
            <option v-for="budget in budgets" :value="budget._id">{{budget.title}}</option>
        </select>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center gap-3 mb-3">
                <div class="p-2 bg-gray-100 text-gray-600 rounded-lg">
                    <i class="pi pi-wallet"></i>
                </div>
                <h3 class="text-sm font-medium text-gray-600">Total Balance</h3>
            </div>
            <p class="text-2xl font-bold text-gray-800">{{ balance }}kr</p>
            <p class="text-sm text-gray-500 mt-1">
                <i :class="balance >= 0 ? 'pi pi-arrow-up text-emerald-500' : 'pi pi-arrow-down text-red-500'" class="mr-1"></i>
                {{ Math.abs(balance) }}kr total
            </p>
        </div>

        <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center gap-3 mb-3">
                <div class="p-2 bg-gray-100 text-gray-600 rounded-lg">
                    <i class="pi pi-arrow-up"></i>
                </div>
                <h3 class="text-sm font-medium text-gray-600">Total Income</h3>
            </div>
            <p class="text-2xl font-bold text-gray-800">{{ totalIncome }}kr</p>
            <p class="text-sm text-gray-500 mt-1">
                <i class="pi pi-plus text-emerald-500 mr-1"></i>
                Income
            </p>
        </div>

        <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center gap-3 mb-3">
                <div class="p-2 bg-gray-100 text-gray-600 rounded-lg">
                    <i class="pi pi-arrow-down"></i>
                </div>
                <h3 class="text-sm font-medium text-gray-600">Total Expenses</h3>
            </div>
            <p class="text-2xl font-bold text-gray-800">{{ totalExpenses }}kr</p>
            <p class="text-sm text-gray-500 mt-1">
                <i class="pi pi-minus text-red-500 mr-1"></i>
                Expenses
            </p>
        </div>
    </div>
    </div>
</template>