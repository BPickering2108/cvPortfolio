import { ref, onMounted, onUnmounted } from 'vue'

export function useTime() {
  const currentTime = ref('')

  const updateTime = () => {
    const now = new Date()
    currentTime.value = now.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    })
  }

  let timeInterval = null

  onMounted(() => {
    updateTime()
    timeInterval = setInterval(updateTime, 1000)
  })

  onUnmounted(() => {
    if (timeInterval) {
      clearInterval(timeInterval)
    }
  })

  return {
    currentTime,
    updateTime
  }
}