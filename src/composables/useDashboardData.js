import { ref } from 'vue'

export function useDashboardData() {
  const isLoading = ref(false)
  const error = ref(null)

  // Load data from JSON files
  const loadDashboardData = async (dataType) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`/data/${dataType}.json`)
      if (!response.ok) {
        throw new Error(`Failed to load ${dataType} data`)
      }
      const data = await response.json()
      isLoading.value = false
      return data
    } catch (err) {
      error.value = err.message
      isLoading.value = false
      console.error(`Error loading ${dataType} data:`, err)
      return null
    }
  }

  // Load external content (like from CV website)
  const loadExternalContent = async (url) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Failed to load content from ${url}`)
      }
      const content = await response.text()
      isLoading.value = false
      return content
    } catch (err) {
      error.value = err.message
      isLoading.value = false
      console.error('Error loading external content:', err)
      return null
    }
  }

  // Load recruiter CV data
  const loadRecruiterData = () => loadDashboardData('recruiterCV')
  
  // Load peer interactions data
  const loadPeerData = () => loadDashboardData('peerInteractions')
  
  // Load volunteering activities data
  const loadVolunteeringData = () => loadDashboardData('volunteeringActivities')

  return {
    isLoading,
    error,
    loadDashboardData,
    loadExternalContent,
    loadRecruiterData,
    loadPeerData,
    loadVolunteeringData
  }
}