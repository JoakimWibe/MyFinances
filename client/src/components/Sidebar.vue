<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useLayoutStore } from '../stores/layoutStore';

const layoutStore = useLayoutStore();
</script>

<template>
    <aside :class="[
        'h-screen flex flex-col p-4 shadow-lg bg-white transition-all duration-300',
        {
            'w-72': layoutStore.isSidebarOpen,
            'w-16': layoutStore.isMobile && !layoutStore.isSidebarOpen,
        },
        layoutStore.isMobile ? 'fixed left-0 z-30' : 'sticky top-0',
        'overflow-y-auto'
    ]">
        <div>
            <div class="flex justify-between items-center gap-4 mb-32 mt-4">
                <div v-show="layoutStore.isSidebarOpen" class="flex gap-2 items-center whitespace-nowrap">
                    <i class="pi pi-user text-2xl"></i>
                    <h2 class="font-medium">Joakim Myhre Wibe</h2>
                </div>
                <button @click="layoutStore.toggleSidebar()" 
                        class="hover:text-primary-600 transition-colors"
                        :class="{ 'w-full flex justify-center': !layoutStore.isSidebarOpen }">
                    <i :class="[
                        'text-xl',
                        layoutStore.isSidebarOpen ? 'pi pi-times' : 'pi pi-ellipsis-v'
                    ]"></i>
                </button>
            </div>

            <nav v-show="layoutStore.isSidebarOpen" class="flex flex-col gap-4">
                <RouterLink active-class="text-primary-600" to="/" 
                          class="flex items-center gap-2 hover:text-primary-600 transition-colors whitespace-nowrap">
                    <i class="pi pi-chart-bar"></i>
                    <span>Dashboard</span>
                </RouterLink>
                <RouterLink active-class="text-primary-600" to="/transactions" 
                          class="flex items-center gap-2 hover:text-primary-600 transition-colors whitespace-nowrap">
                    <i class="pi pi-credit-card"></i>
                    <span>All Transactions</span>
                </RouterLink>
                <RouterLink active-class="text-primary-600" to="/incomes" 
                          class="flex items-center gap-2 hover:text-primary-600 transition-colors whitespace-nowrap">
                    <i class="pi pi-arrow-right"></i>
                    <span>Incomes</span>
                </RouterLink>
                <RouterLink active-class="text-primary-600" to="/expenses" 
                          class="flex items-center gap-2 hover:text-primary-600 transition-colors whitespace-nowrap">
                    <i class="pi pi-arrow-left"></i>
                    <span>Expenses</span>
                </RouterLink>
            </nav>
        </div>
    </aside>
</template>
