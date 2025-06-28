<template>
  <div class="taskbar">
    <div class="taskbar-content">
      <div class="start-button" @click="handleStartClick">
        <svg viewBox="0 0 24 24" fill="currentColor" class="windows-logo">
          <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/>
        </svg>
      </div>
      <div class="taskbar-items">
        <div 
          v-for="item in taskbarItems" 
          :key="item.id"
          class="taskbar-item" 
          :class="{ active: item.active }"
          @click="handleTaskbarItemClick(item)"
        >
          <span class="taskbar-icon">{{ item.icon }}</span>
          {{ item.label }}
        </div>
      </div>
      <div class="system-tray">
        <span class="time">{{ currentTime }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { useTime } from '@/composables/useTime'

const props = defineProps({
  taskbarItems: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['start-click', 'taskbar-item-click'])

const { currentTime } = useTime()

const handleStartClick = () => {
  emit('start-click')
}

const handleTaskbarItemClick = (item) => {
  emit('taskbar-item-click', item)
}
</script>

<style scoped>
.taskbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 200;
}

.taskbar-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 8px;
  position: relative;
  gap: 8px;
}

.start-button {
  width: 48px;
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;
}

.start-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.windows-logo {
  width: 16px;
  height: 16px;
  color: white;
}

.taskbar-items {
  display: flex;
  align-items: center;
  gap: 4px;
}

.taskbar-item {
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: white;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.taskbar-item:hover {
  background: rgba(255, 255, 255, 0.15);
}

.taskbar-item.active {
  background: rgba(255, 255, 255, 0.2);
}

.system-tray {
  position: absolute;
  right: 8px;
  color: white;
  font-size: 13px;
  padding: 0 12px;
}
</style>