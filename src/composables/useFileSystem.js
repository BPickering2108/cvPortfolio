import { ref } from 'vue'

export function useFileSystem() {
  const openFiles = ref([])
  const fileHistory = ref([])
  
  // File type icons mapping
  const fileIcons = {
    '.txt': '📄',
    '.doc': '📝',
    '.pdf': '📕',
    '.xls': '📊',
    '.ppt': '📰',
    '.zip': '🗜️',
    '.exe': '⚙️',
    'folder': '📁',
    'default': '📄'
  }

  // Get file icon based on extension
  const getFileIcon = (fileName) => {
    if (!fileName) return fileIcons.default
    
    const extension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase()
    return fileIcons[extension] || fileIcons.default
  }

  // Open a file/folder
  const openFile = (fileData) => {
    if (!fileData) return null

    const openedFile = {
      id: Date.now(), // Simple ID generation
      name: fileData.name || fileData.label,
      type: fileData.files ? 'folder' : 'file',
      content: fileData.content || '',
      files: fileData.files || [],
      iconPath: fileData.iconPath || '',
      openedAt: new Date()
    }

    // Add to open files list
    openFiles.value.push(openedFile)
    
    // Add to history
    fileHistory.value.push({
      action: 'open',
      file: openedFile.name,
      timestamp: new Date()
    })

    return openedFile
  }

  // Close a file
  const closeFile = (fileData) => {
    if (!fileData) return null

    // Remove from open files
    const index = openFiles.value.findIndex(f => f.id === fileData.id)
    if (index > -1) {
      openFiles.value.splice(index, 1)
    }

    // Add to history
    fileHistory.value.push({
      action: 'close',
      file: fileData.name,
      timestamp: new Date()
    })

    return null
  }

  // Get file extension
  const getFileExtension = (fileName) => {
    if (!fileName) return ''
    return fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase()
  }

  // Check if file is a text file
  const isTextFile = (fileName) => {
    const textExtensions = ['txt', 'md', 'log', 'csv', 'json', 'xml', 'html', 'css', 'js']
    return textExtensions.includes(getFileExtension(fileName))
  }

  // Check if file is an image
  const isImageFile = (fileName) => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp']
    return imageExtensions.includes(getFileExtension(fileName))
  }

  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B'
    
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  // Get file info
  const getFileInfo = (fileData) => {
    return {
      name: fileData.name || 'Unknown',
      type: fileData.files ? 'Folder' : 'File',
      size: fileData.content ? formatFileSize(fileData.content.length) : '0 B',
      extension: getFileExtension(fileData.name),
      icon: getFileIcon(fileData.name),
      isFolder: !!fileData.files,
      itemCount: fileData.files ? fileData.files.length : 0
    }
  }

  // Search files by name
  const searchFiles = (query, files) => {
    if (!query || !files) return []
    
    return files.filter(file => 
      file.name.toLowerCase().includes(query.toLowerCase()) ||
      (file.content && file.content.toLowerCase().includes(query.toLowerCase()))
    )
  }

  // Sort files
  const sortFiles = (files, sortBy = 'name', ascending = true) => {
    if (!files) return []
    
    const sorted = [...files].sort((a, b) => {
      let aValue, bValue
      
      switch (sortBy) {
        case 'name':
          aValue = a.name || ''
          bValue = b.name || ''
          break
        case 'type':
          aValue = a.files ? 'folder' : getFileExtension(a.name)
          bValue = b.files ? 'folder' : getFileExtension(b.name)
          break
        case 'size':
          aValue = a.content ? a.content.length : 0
          bValue = b.content ? b.content.length : 0
          break
        default:
          aValue = a.name || ''
          bValue = b.name || ''
      }
      
      if (typeof aValue === 'string') {
        return ascending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }
      
      return ascending ? aValue - bValue : bValue - aValue
    })
    
    // Always put folders first
    return sorted.sort((a, b) => {
      if (a.files && !b.files) return -1
      if (!a.files && b.files) return 1
      return 0
    })
  }

  // Clear file history
  const clearHistory = () => {
    fileHistory.value = []
  }

  // Get recent files
  const getRecentFiles = (limit = 10) => {
    return fileHistory.value
      .filter(entry => entry.action === 'open')
      .slice(-limit)
      .reverse()
  }

  return {
    openFiles,
    fileHistory,
    openFile,
    closeFile,
    getFileIcon,
    getFileExtension,
    isTextFile,
    isImageFile,
    formatFileSize,
    getFileInfo,
    searchFiles,
    sortFiles,
    clearHistory,
    getRecentFiles
  }
}