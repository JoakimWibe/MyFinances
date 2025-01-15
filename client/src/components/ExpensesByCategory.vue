<script setup lang="ts">
import { useTransactionStore } from '@/stores/transactionStore';
import { storeToRefs } from 'pinia';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
import { computed } from 'vue';

const transactionsStore = useTransactionStore();
const { expenses } = storeToRefs(transactionsStore);

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
        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
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
    <h2 class="text-xl font-bold text-gray-800 mb-8">Expenses by Category</h2>
    <div class="flex-1 flex justify-center items-center">
      <div class="relative h-[300px] w-'[300px">
        <Pie :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>