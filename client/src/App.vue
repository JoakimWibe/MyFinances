<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import { useLayoutStore } from './stores/layout'
import { onMounted } from 'vue'
import Backdrop from './components/Backdrop.vue'

const layoutStore = useLayoutStore()

onMounted(() => {
  layoutStore.initializeLayout()
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
