<script setup lang="ts">
import { useLayoutStore } from '@/stores/layout';

const layoutStore = useLayoutStore()
</script>


<template>
    <div v-if="layoutStore.isSidebarOpen && layoutStore.isMobile" 
            @click="layoutStore.toggleSidebar()"
            class="fixed inset-0 bg-black/20 backdrop-blur-sm z-20">
    </div>
</template>
