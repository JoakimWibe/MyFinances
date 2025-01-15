import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLayoutStore = defineStore('layout', () => {
  const isSidebarOpen = ref(window.innerWidth >= 768)
  const isMobile = ref(false)

  function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value
  }

  function initializeLayout() {
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
  }

  function checkIfMobile() {
    const wasMobile = isMobile.value
    isMobile.value = window.innerWidth < 768
    
    if (wasMobile && !isMobile.value) {
      isSidebarOpen.value = true
    }

    else if (!wasMobile && isMobile.value) {
      isSidebarOpen.value = false
    }
  }

  return {
    isSidebarOpen,
    isMobile,
    toggleSidebar,
    initializeLayout
  }
})
