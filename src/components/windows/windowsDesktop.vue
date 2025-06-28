<template>
  <div class="desktop-container">
    <!-- Desktop Background -->
    <div 
      class="desktop-background" 
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    >
      <!-- Desktop Icons -->
      <div class="desktop-icons">
        <desktopIcon
          v-for="icon in desktopIcons" 
          :key="icon.name"
          :label="icon.name"
          :icon-path="icon.iconPath"
          :data="icon"
          @double-click="handleIconDoubleClick"
        />
      </div>

      <!-- Terminal Window -->
      <terminalWindow
        v-if="showTerminal && terminalConfig"
        :title="terminalConfig.title"
        :prompt="terminalConfig.prompt"
        :command="terminalConfig.command"
        :content="terminalContent"
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
import { ref, computed, onMounted, defineProps, defineEmits } from 'vue'
import desktopIcon from '@/components/windows/desktopIcon.vue'
import terminalWindow from '@/components/windows/terminalWindow.vue'
import windowsTaskbar from '@/components/windows/windowsTaskbar.vue'
import fileExplorer from '@/components/windows/fileExplorer.vue'
import notepadWindow from '@/components/windows/notepadWindow.vue'
import { useDashboardData } from '@/composables/useDashboardData'
import { useWindowsTheme } from '@/composables/useWindowsTheme'
import { useFileSystem } from '@/composables/useFileSystem'

const props = defineProps({
  dashboardType: {
    type: String,
    required: true // 'recruiter', 'peer', 'volunteering'
  },
  backgroundImage: {
    type: String,
    default: ''
  },
  showTerminal: {
    type: Boolean,
    default: true
  },
  terminalContent: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['start-click'])

// Reactive data
const isTerminalMinimized = ref(false)
const isTerminalClosed = ref(false)
const openedFile = ref(null)
const openedSubFile = ref(null)
const dashboardData = ref(null)

// Composables
const { loadDashboardData, isLoading, error } = useDashboardData()
const { applyWindowsTheme } = useWindowsTheme()
const { openFile, closeFile } = useFileSystem()

// Computed properties
const desktopIcons = computed(() => {
  return dashboardData.value?.desktopIcons || []
})

const terminalConfig = computed(() => {
  return dashboardData.value?.terminal || null
})

const taskbarItems = computed(() => {
  const items = []
  
  if (props.showTerminal && !isTerminalClosed.value) {
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
const handleStartClick = () => {
  emit('start-click')
}

const handleTaskbarItemClick = (item) => {
  if (item.id === 'terminal') {
    if (isTerminalClosed.value) {
      isTerminalClosed.value = false
      isTerminalMinimized.value = false
    } else if (isTerminalMinimized.value) {
      isTerminalMinimized.value = false
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
  openedFile.value = openFile(iconData)
}

const closeFileModal = () => {
  openedFile.value = closeFile(openedFile.value)
}

const openSubFile = (fileData) => {
  openedSubFile.value = openFile(fileData)
}

const closeSubFileModal = () => {
  openedSubFile.value = closeFile(openedSubFile.value)
}

// Load data on mount
onMounted(async () => {
  try {
    // Apply Windows theme
    applyWindowsTheme()
    
    // Load dashboard-specific data
    const data = await loadDashboardData(props.dashboardType)
    if (data) {
      dashboardData.value = data
    }
  } catch (err) {
    console.error(`Error loading ${props.dashboardType} dashboard:`, err)
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Segoe+UI:wght@400;500;600&display=swap');

.desktop-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: fixed;
  top: 0;
  left: 0;
}

.desktop-background {
  width: 100%;
  height: 100%;
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