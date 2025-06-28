<template>
  <div class="terminal-window" :class="{ minimized: isMinimized }" v-if="!isClosed">
    <div class="terminal-header">
      <div class="terminal-title">
        <span class="terminal-icon">⬛</span>
        {{ title }}
      </div>
      <div class="terminal-controls">
        <button @click="handleMinimize" class="control-btn minimize">−</button>
        <button @click="handleMaximize" class="control-btn maximize">□</button>
        <button @click="handleClose" class="control-btn close">×</button>
      </div>
    </div>
    <div class="terminal-body" v-if="!isMinimized">
      <div class="terminal-content">
        <div class="terminal-prompt">{{ prompt }}</div>
        <div class="terminal-text">
          <p v-if="command">{{ prompt }}{{ command }}</p>
          <br v-if="command">
          <div class="content-section">
            <div class="terminal-display">{{ content }}</div>
          </div>
          <br>
          <div class="terminal-cursor">_</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Command Prompt'
  },
  prompt: {
    type: String,
    default: 'C:\\Users\\User>'
  },
  command: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  isMinimized: {
    type: Boolean,
    default: false
  },
  isClosed: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['minimize', 'maximize', 'close'])

const handleMinimize = () => {
  emit('minimize')
}

const handleMaximize = () => {
  emit('maximize')
}

const handleClose = () => {
  emit('close')
}
</script>

<style scoped>
.terminal-window {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 500px;
  background: #0c0c0c;
  border: 1px solid #404040;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  z-index: 100;
  transition: all 0.3s ease;
}

.terminal-window.minimized {
  transform: translate(-50%, 100%);
  opacity: 0;
}

.terminal-window.maximized {
  width: 90vw;
  height: 80vh;
  top: 10vh;
  left: 5vw;
  transform: none;
}

.terminal-header {
  background: #2d2d2d;
  color: white;
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px 8px 0 0;
}

.terminal-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.terminal-controls {
  display: flex;
  gap: 8px;
}

.control-btn {
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}

.minimize {
  background: #fdd835;
  color: #333;
}

.maximize {
  background: #4caf50;
  color: white;
}

.close {
  background: #f44336;
  color: white;
}

.control-btn:hover {
  opacity: 0.8;
}

.terminal-body {
  height: calc(100% - 40px);
  padding: 16px;
  overflow: hidden;
}

.terminal-content {
  color: #00ff00;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  line-height: 1.4;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.terminal-prompt {
  color: #ffffff;
  margin-bottom: 8px;
}

.terminal-text p {
  margin: 0;
  color: #cccccc;
}

.content-section {
  flex: 1;
  margin: 16px 0;
}

.terminal-display {
  color: #00ff00;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  line-height: 1.4;
  white-space: pre-wrap;
  height: 100%;
  overflow-y: auto;
  padding-right: 8px;
}

.terminal-display::-webkit-scrollbar {
  width: 8px;
}

.terminal-display::-webkit-scrollbar-track {
  background: #1a1a1a;
}

.terminal-display::-webkit-scrollbar-thumb {
  background: #404040;
  border-radius: 4px;
}

.terminal-display::-webkit-scrollbar-thumb:hover {
  background: #505050;
}

.terminal-cursor {
  color: #00ff00;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

@media (max-width: 768px) {
  .terminal-window {
    width: 90vw;
    height: 60vh;
  }
}
</style>