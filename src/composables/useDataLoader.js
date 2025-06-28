import { ref } from 'vue'

export function useDataLoader() {
  const isLoading = ref(false)
  const error = ref(null)

  // Load sub-data files
  const loadSubData = async (dataType) => {
    try {
      const { default: data } = await import(`@/data/${dataType}.json`)
      return data
    } catch (err) {
      console.warn(`Failed to load ${dataType}.json:`, err)
      return []
    }
  }

  // Load and resolve modular data structure
  const loadRecruiterData = async () => {
    isLoading.value = true
    error.value = null

    try {
      // Load main index file
      const { default: mainData } = await import('@/data/recruiterCV.json')
      
      // Clone the main data to avoid mutations
      const resolvedData = JSON.parse(JSON.stringify(mainData))

      // Resolve @references in desktop icons
      if (resolvedData.desktopIcons) {
        for (const icon of resolvedData.desktopIcons) {
          if (typeof icon.files === 'string' && icon.files.startsWith('@')) {
            const dataType = icon.files.substring(1) // Remove @
            icon.files = await loadSubData(dataType)
          }
        }
      }

      console.log('Modular data loaded and resolved:', resolvedData)
      return resolvedData

    } catch (err) {
      console.error('Failed to load recruiter data:', err)
      error.value = 'Failed to load dashboard data'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    loadRecruiterData
  }
}