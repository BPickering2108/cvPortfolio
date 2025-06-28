<template>
  <div class="file-modal-overlay" @click="handleClose">
    <div class="file-explorer" @click.stop>
      <div class="explorer-header">
        <div class="explorer-title">
          <span class="folder-icon">📁</span>
          {{ folderData.name || folderData.label }}
        </div>
        <button @click="handleClose" class="modal-close">×</button>
      </div>
      <div class="explorer-body">
        <div class="file-list">
          <div 
            v-for="(file, index) in folderData.files" 
            :key="index"
            class="file-item"
            @dblclick="handleFileSelect(file)"
          >
            <span class="file-icon">📄</span>
            <span class="file-name">{{ file.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  folderData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'file-select'])

const handleClose = () => {
  emit('close')
}

const handleFileSelect = (file) => {
  emit('file-select', file)
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

.file-explorer {
  width: 600px;
  height: 450px;
  background: #f0f0f0;
  border: 2px outset #c0c0c0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
}

.explorer-header {
  background: linear-gradient(to bottom, #0078d4, #106ebe);
  color: white;
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}

.explorer-title {
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

.explorer-body {
  flex: 1;
  padding: 16px;
  background: white;
}

.file-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
}

.file-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 8px;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}

.file-item:hover {
  background: #e6f3ff;
  border-color: #0078d4;
}

.file-item:active {
  background: #cce7ff;
}

.file-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.file-name {
  font-size: 12px;
  color: #333;
  word-wrap: break-word;
  max-width: 120px;
}

@media (max-width: 768px) {
  .file-explorer {
    width: 90vw;
    height: 70vh;
    margin: 20px;
  }
  
  .file-list {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 12px;
  }
}
</style>