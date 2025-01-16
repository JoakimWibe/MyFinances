<script setup lang="ts">
import {RouterLink} from "vue-router";
</script>

<template>
    <div class="fixed inset-0 bg-slate-50 flex items-center justify-center p-4 z-[100]">
        <div class="text-center">
            <h1 class="text-9xl font-bold text-emerald-500">404</h1>
            <h2 class="text-2xl font-bold text-gray-800 mt-4">Page Not Found</h2>
            <p class="text-gray-500 mt-2">The page you're looking for doesn't exist or has been moved.</p>
            <RouterLink to="/" class="inline-block mt-8 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors">
                <i class="pi pi-home mr-2"></i>
                Go Home
            </RouterLink>
        </div>
    </div>
</template>