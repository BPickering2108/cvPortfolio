<template>
  <main>
    <router-view v-slot="{ Component, route }">
      <transition 
        :name="route.meta.transition || 'fade'"
        mode="out-in"
        appear
      >
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </main>
  <footer>
    <p>&copy; {{ currentYear }} Bradley Pickering</p>
  </footer>
</template>

<script setup>
import { ref } from 'vue';

const currentYear = ref(new Date().getFullYear());
</script>

<style scoped>
footer {
  margin-top: 2rem;
  padding: 1rem;
  color: #f0f0f0;
  text-align: center;
}

main {
  min-height: 80vh;
}

/* Page Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Slide transition for profile navigation */
.slide-enter-active, .slide-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* Power-off transition for special cases */
.power-off-enter-active, .power-off-leave-active {
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.power-off-enter-from, .power-off-leave-to {
  transform: scale(0);
  opacity: 0;
}
</style>