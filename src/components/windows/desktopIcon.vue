<template>
  <div class="desktop-icon" @dblclick="handleDoubleClick">
    <div class="icon-image">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path :d="iconPath"/>
      </svg>
    </div>
    <div class="icon-label">{{ label }}</div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  iconPath: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['double-click'])

const handleDoubleClick = () => {
  emit('double-click', {
    label: props.label,
    iconPath: props.iconPath,
    ...props.data
  })
}
</script>

<style scoped>
.desktop-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease;
  padding: 8px;
  border-radius: 4px;
}

.desktop-icon:hover {
  background: rgba(255, 255, 255, 0.1);
}

.desktop-icon:active {
  background: rgba(255, 255, 255, 0.2);
}

.icon-image {
  width: 48px;
  height: 48px;
  background: linear-gradient(145deg, #f0f0f0, #d0d0d0);
  border: 1px solid #c0c0c0;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  margin-bottom: 4px;
  box-shadow: 
    inset 1px 1px 2px rgba(255, 255, 255, 0.8),
    inset -1px -1px 2px rgba(0, 0, 0, 0.2),
    0 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
}

.icon-image::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  right: 2px;
  height: 1px;
  background: rgba(255, 255, 255, 0.6);
}

.icon-image::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  bottom: 2px;
  width: 1px;
  background: rgba(255, 255, 255, 0.4);
}

.icon-image svg {
  width: 24px;
  height: 24px;
}

.icon-label {
  color: white;
  font-size: 11px;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  max-width: 70px;
  word-wrap: break-word;
}
</style>