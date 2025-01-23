<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import { useLayoutStore } from './stores/layoutStore'
import { onMounted } from 'vue'
import Backdrop from './components/Backdrop.vue'
import { useTransactionStore } from '@/stores/transactionStore';
import { storeToRefs } from 'pinia';


const layoutStore = useLayoutStore()

onMounted(() => {
  layoutStore.initializeLayout()
})

const transactionsStore = useTransactionStore();
const { fetchTransactions,fetchBudgets, selectBudget } = transactionsStore;

const { 
  budgets,
  selectedBudget
} = storeToRefs(transactionsStore);

onMounted(async () => {
    await fetchBudgets()
    await selectBudget(budgets.value[0]._id)
    await fetchTransactions(selectedBudget.value?._id)
})
</script>

<template>
  <div class="relative flex">
    <Backdrop /> <!-- only visible on smaller screens -->
    <Sidebar />
    <main class="flex-1 min-h-screen transition-all duration-300"
          :class="{
            'ml-16': !layoutStore.isSidebarOpen && layoutStore.isMobile
          }">
      <RouterView />
    </main>
  </div>
</template>
