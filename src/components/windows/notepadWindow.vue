<template>
  <div class="file-modal-overlay" @click="handleClose">
    <div class="notepad-window" @click.stop>
      <div class="notepad-header">
        <div class="notepad-title">
          <span class="notepad-icon">🗒️</span>
          {{ fileData.name }} - Notepad
        </div>
        <button @click="handleClose" class="modal-close">×</button>
      </div>
      <div class="notepad-body">
        <div class="notepad-content">{{ fileData.content }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  fileData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const handleClose = () => {
  emit('close')
}
</script>

<style scoped>
.file-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.notepad-window {
  width: 800px;
  height: 600px;
  background: #f0f0f0;
  border: 2px outset #c0c0c0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
}

.notepad-header {
  background: linear-gradient(to bottom, #0078d4, #106ebe);
  color: white;
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}

.notepad-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

.modal-close {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: white;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.2);
}

.notepad-body {
  flex: 1;
  padding: 0;
  background: white;
  border: 2px inset #c0c0c0;
  margin: 4px;
}

.notepad-content {
  width: 100%;
  height: 100%;
  padding: 16px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 12px;
  line-height: 1.4;
  white-space: pre-wrap;
  overflow-y: auto;
  background: white;
  border: none;
  outline: none;
  color: #000;
}

.notepad-content::-webkit-scrollbar {
  width: 16px;
}

.notepad-content::-webkit-scrollbar-track {
  background: #f0f0f0;
}

.notepad-content::-webkit-scrollbar-thumb {
  background: #c0c0c0;
  border: 1px outset #c0c0c0;
}

.notepad-content::-webkit-scrollbar-thumb:hover {
  background: #b0b0b0;
}

@media (max-width: 768px) {
  .notepad-window {
    width: 90vw;
    height: 70vh;
    margin: 20px;
  }
}
</style>