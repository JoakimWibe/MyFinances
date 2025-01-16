<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useLayoutStore } from '../stores/layoutStore';

const layoutStore = useLayoutStore();

const handleNavClick = () => {
    if (layoutStore.isMobile) {
        layoutStore.toggleSidebar();
    }
};
</script>

<template>
    <aside :class="[
        'h-screen flex flex-col p-4 shadow-lg transition-all duration-300 bg-slate-800',
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
                    <i class="pi pi-wallet text-2xl text-emerald-400"></i>
                    <h2 class="font-medium text-white text-lg">My Finances</h2>
                </div>
                <button @click="layoutStore.toggleSidebar()" 
                        class="hover:text-emerald-400 transition-colors text-white"
                        :class="{ 'w-full flex justify-center': !layoutStore.isSidebarOpen }">
                    <i :class="[
                        'text-xl',
                        layoutStore.isSidebarOpen ? 'pi pi-times' : 'pi pi-ellipsis-v'
                    ]"></i>
                </button>
            </div>

            <nav v-show="layoutStore.isSidebarOpen" class="flex flex-col gap-4">
                <RouterLink @click="handleNavClick" active-class="text-emerald-400" to="/" 
                          class="flex items-center gap-2 text-gray-300 hover:text-emerald-400 transition-colors whitespace-nowrap">
                    <i class="pi pi-chart-bar"></i>
                    <span>Dashboard</span>
                </RouterLink>
                <RouterLink @click="handleNavClick" active-class="text-emerald-400" to="/transactions" 
                          class="flex items-center gap-2 text-gray-300 hover:text-emerald-400 transition-colors whitespace-nowrap">
                    <i class="pi pi-credit-card"></i>
                    <span>All Transactions</span>
                </RouterLink>
            </nav>
        </div>
    </aside>
</template>
