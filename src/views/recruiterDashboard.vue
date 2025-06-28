<template>
  <div class="desktop-container">
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-screen">
      <div class="loading-content">
        <div class="windows-logo">⊞</div>
        <p>Loading Dashboard...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-screen">
      <div class="error-content">
        <h2>Error Loading Dashboard</h2>
        <p>{{ error }}</p>
        <button @click="loadDashboardData" class="retry-btn">Retry</button>
      </div>
    </div>

    <!-- Main Desktop -->
    <div v-else-if="dashboardData" class="desktop-background" :style="backgroundStyle">
      <!-- Desktop Icons -->
      <div class="desktop-icons">
        <desktopIcon
          v-for="icon in dashboardData?.desktopIcons || []" 
          :key="icon.name"
          :label="icon.name"
          :icon-path="icon.iconPath"
          :data="icon"
          @double-click="handleIconDoubleClick"
        />
      </div>

      <!-- Terminal Window -->
      <terminalWindow
        v-if="dashboardData?.terminal && !isTerminalClosed"
        :title="dashboardData.terminal.title"
        :prompt="dashboardData.terminal.prompt"
        :command="dashboardData.terminal.command"
        :content="dashboardData.summary || ''"
        :is-minimized="isTerminalMinimized"
        :is-closed="isTerminalClosed"
        @minimize="handleTerminalMinimize"
        @maximize="handleTerminalMaximize"
        @close="handleTerminalClose"
      />

      <!-- Windows Taskbar -->
      <windowsTaskbar
        :taskbar-items="taskbarItems"
        @start-click="handleStartClick"
        @taskbar-item-click="handleTaskbarItemClick"
      />
    </div>

    <!-- Fallback if no data -->
    <div v-else class="loading-screen">
      <div class="loading-content">
        <div class="windows-logo">⊞</div>
        <p>Initializing Dashboard...</p>
      </div>
    </div>

    <!-- File Explorer Modal -->
    <fileExplorer
      v-if="openedFile"
      :folder-data="openedFile"
      @close="closeFileModal"
      @file-select="openSubFile"
    />

    <!-- Notepad Modal -->
    <notepadWindow
      v-if="openedSubFile"
      :file-data="openedSubFile"
      @close="closeSubFileModal"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import desktopIcon from '@/components/windows/desktopIcon.vue'
import terminalWindow from '@/components/windows/terminalWindow.vue'
import windowsTaskbar from '@/components/windows/windowsTaskbar.vue'
import fileExplorer from '@/components/windows/fileExplorer.vue'
import notepadWindow from '@/components/windows/notepadWindow.vue'
import { useDashboardData } from '@/composables/useDashboardData'
// Import the background image
import desktopBackgroundImg from '@/assets/images/desktopBackground.png'

const router = useRouter()

// Reactive data
const isTerminalMinimized = ref(false)
const isTerminalClosed = ref(false)
const openedFile = ref(null)
const openedSubFile = ref(null)
const dashboardData = ref(null)
const isLoading = ref(true)
const error = ref(null)

// Computed properties
const backgroundStyle = computed(() => ({
  backgroundImage: `url(${desktopBackgroundImg})`
}))

const taskbarItems = computed(() => {
  const items = []
  
  if (dashboardData.value?.terminal && !isTerminalClosed.value) {
    items.push({
      id: 'terminal',
      icon: '⬛',
      label: 'Terminal',
      active: !isTerminalMinimized.value
    })
  }
  
  return items
})

// Methods
const loadDashboardData = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    // Load main recruiter CV data
    const { default: mainData } = await import('@/data/recruiterCV.json')
    
    // Clone to avoid mutation
    const resolvedData = JSON.parse(JSON.stringify(mainData))
    
    // Resolve @references manually for now
    if (resolvedData.desktopIcons) {
      for (const icon of resolvedData.desktopIcons) {
        if (typeof icon.files === 'string' && icon.files.startsWith('@')) {
          const dataType = icon.files.substring(1)
          
          try {
            let subData = []
            
            // Load the appropriate sub-file
            switch (dataType) {
              case 'experience':
                const { default: expData } = await import('@/data/experience.json')
                subData = expData
                break
              case 'technicalSkillset':
                const { default: technicalSkillsetData } = await import('@/data/technicalSkillset.json')
                subData = technicalSkillsetData
                break
              case 'certifications':
                const { default: certsData } = await import('@/data/certifications.json')
                subData = certsData
                break
              default:
                console.warn(`Unknown data type: ${dataType}`)
                subData = []
            }
            
            icon.files = subData
            
          } catch (subError) {
            console.warn(`Failed to load ${dataType}.json:`, subError)
            icon.files = []
          }
        }
      }
    }
    
    dashboardData.value = resolvedData
    console.log('Dashboard data loaded successfully:', resolvedData)
    
  } catch (err) {
    console.error('Failed to load dashboard data:', err)
    error.value = 'Failed to load dashboard data'
  } finally {
    isLoading.value = false
  }
}

const handleStartClick = () => {
  router.push('/')
}

const handleTaskbarItemClick = (item) => {
  if (item.id === 'terminal') {
    if (isTerminalClosed.value) {
      isTerminalClosed.value = false
      isTerminalMinimized.value = false
    } else if (isTerminalMinimized.value) {
      isTerminalMinimized.value = false
    } else {
      isTerminalMinimized.value = true
    }
  }
}

const handleTerminalMinimize = () => {
  isTerminalMinimized.value = !isTerminalMinimized.value
}

const handleTerminalMaximize = () => {
  const terminal = document.querySelector('.terminal-window')
  if (terminal) {
    terminal.classList.toggle('maximized')
  }
}

const handleTerminalClose = () => {
  isTerminalClosed.value = true
  isTerminalMinimized.value = false
}

const handleIconDoubleClick = (iconData) => {
  // Check if this is the terminal icon
  if (iconData.action === 'open-terminal') {
    // Reopen the terminal window
    isTerminalClosed.value = false
    isTerminalMinimized.value = false
    return
  }
  
  // Handle other folder/file icons
  openedFile.value = { ...iconData }
}

const closeFileModal = () => {
  openedFile.value = null
}

const openSubFile = (fileData) => {
  openedSubFile.value = { ...fileData }
}

const closeSubFileModal = () => {
  openedSubFile.value = null
}

// Load data on mount
onMounted(() => {
  loadDashboardData()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Segoe+UI:wght@400;500;600&display=swap');

/* Remove default margins and prevent scrollbars */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.desktop-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: fixed;
  top: 0;
  left: 0;
}

.loading-screen, .error-screen {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0078d4 0%, #106ebe 100%);
  color: white;
}

.loading-content, .error-content {
  text-align: center;
}

.windows-logo {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: background 0.2s;
}

.retry-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.desktop-background {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0078d4 0%, #106ebe 100%);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  flex-direction: column;
}

.desktop-icons {
  display: grid;
  grid-template-columns: repeat(auto-fill, 80px);
  gap: 20px;
  padding: 20px;
  height: calc(100vh - 80px);
  align-content: start;
}

@media (max-width: 768px) {
  .desktop-icons {
    grid-template-columns: repeat(auto-fill, 70px);
    gap: 15px;
    padding: 15px;
  }
}
</style>