<script setup lang="ts">
import EditBudget from '@/components/EditBudget.vue';
import { useTransactionStore } from '@/stores/transactionStore';
import { storeToRefs } from 'pinia';
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

const transactionsStore = useTransactionStore();
const { fetchBudgetById } = transactionsStore;

const { 
  budget,
  loadingStates, 
  error
} = storeToRefs(transactionsStore);

onMounted(async () => {
   await fetchBudgetById(id)
});

</script>

<template>
  <section class="p-4 md:p-8 flex flex-col bg-slate-50 min-h-screen">
      <div class="mb-8">
          <h1 class="text-2xl font-bold text-gray-800">{{ budget?.title }}</h1>
          <p class="text-gray-500 mt-1">Manage your budget</p>
      </div>

      <div v-if="loadingStates.fetchingBudget" class="flex items-center justify-center flex-1">
            <i class="pi pi-spin pi-spinner text-4xl text-emerald-500"></i>
        </div>

        <div v-else-if="error" class="flex flex-col items-center justify-center flex-1 gap-4 text-red-500">
            <i class="pi pi-exclamation-circle text-4xl"></i>
            <div class="text-lg font-medium">{{ error }}</div>
        </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <EditBudget  />
      </div>
  </section>
</template>