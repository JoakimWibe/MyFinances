<script setup lang="ts">
import AddBudget from '@/components/AddBudget.vue';
import AllBudgets from '@/components/AllBudgets.vue';


</script>

<template>
    <section class="p-4 md:p-8 flex flex-col bg-slate-50 min-h-screen">
        <div class="mb-8">
            <h1 class="text-2xl font-bold text-gray-800">Budgets</h1>
            <p class="text-gray-500 mt-1">Manage your budgets</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2 h-[calc(100vh-12rem)] flex flex-col">
                <AllBudgets />
            </div>
            
            <div class="lg:col-span-1">
               <AddBudget />
            </div>
        </div>
    </section>
</template>