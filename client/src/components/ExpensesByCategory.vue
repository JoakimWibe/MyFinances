<script setup lang="ts">
import { useTransactionStore } from '@/stores/transactionStore';
import { storeToRefs } from 'pinia';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
import { computed } from 'vue';

const transactionsStore = useTransactionStore();
const { expenses, loadingStates, error } = storeToRefs(transactionsStore);

ChartJS.register(ArcElement, Tooltip, Legend)

const chartData = computed(() => {
  const categoryTotals = expenses.value.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.amount;
    return acc;
  }, {} as Record<string, number>);

  return {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        backgroundColor: ['#34D399', '#EF4444', '#3B82F6', '#DC2626', '#F472B6'],
        data: Object.values(categoryTotals)
      }
    ]
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}
</script>

<template>
  <div class="bg-white p-4 shadow-md rounded h-[500px] flex flex-col">
    <div class="flex-1 flex justify-center items-center">
      <div v-if="loadingStates.fetchingTransactions" class="flex items-center justify-center">
        <i class="pi pi-spin pi-spinner text-4xl text-emerald-500"></i>
      </div>

      <div v-else-if="error" class="flex flex-col items-center justify-center gap-4 text-red-500">
        <i class="pi pi-exclamation-circle text-4xl"></i>
        <div class="text-lg font-medium">{{ error }}</div>
      </div>

      <div v-else-if="expenses.length === 0 && !loadingStates.fetchingTransactions && !error" class="text-center text-gray-500 text-lg">
        No data to display
      </div>

      <div v-else class="relative h-[300px] w-[300px">
        <Pie :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>