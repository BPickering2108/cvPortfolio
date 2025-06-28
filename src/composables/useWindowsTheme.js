import { ref } from 'vue'

export function useWindowsTheme() {
  const currentTheme = ref('windows10')
  
  // Windows color schemes
  const themes = {
    windows10: {
      primaryColor: '#0078d4',
      secondaryColor: '#106ebe',
      backgroundColor: '#f0f0f0',
      textColor: '#000000',
      borderColor: '#c0c0c0',
      shadowColor: 'rgba(0, 0, 0, 0.3)'
    },
    windows95: {
      primaryColor: '#008080',
      secondaryColor: '#004040',
      backgroundColor: '#c0c0c0',
      textColor: '#000000',
      borderColor: '#808080',
      shadowColor: 'rgba(0, 0, 0, 0.5)'
    },
    dark: {
      primaryColor: '#0078d4',
      secondaryColor: '#106ebe',
      backgroundColor: '#1e1e1e',
      textColor: '#ffffff',
      borderColor: '#404040',
      shadowColor: 'rgba(0, 0, 0, 0.7)'
    }
  }

  // Apply theme to document root
  const applyWindowsTheme = (themeName = 'windows10') => {
    const theme = themes[themeName] || themes.windows10
    const root = document.documentElement

    // Set CSS custom properties
    root.style.setProperty('--windows-primary-color', theme.primaryColor)
    root.style.setProperty('--windows-secondary-color', theme.secondaryColor)
    root.style.setProperty('--windows-bg-color', theme.backgroundColor)
    root.style.setProperty('--windows-text-color', theme.textColor)
    root.style.setProperty('--windows-border-color', theme.borderColor)
    root.style.setProperty('--windows-shadow-color', theme.shadowColor)

    currentTheme.value = themeName
  }

  // Get Windows-style button colors
  const getButtonColors = () => ({
    minimize: '#fdd835',
    maximize: '#4caf50',
    close: '#f44336'
  })

  // Get Windows-style gradients
  const getWindowsGradients = () => ({
    titleBar: `linear-gradient(to bottom, ${themes[currentTheme.value].primaryColor}, ${themes[currentTheme.value].secondaryColor})`,
    button3D: 'linear-gradient(145deg, #f0f0f0, #d0d0d0)',
    inset: 'inset 2px 2px 4px rgba(0,0,0,0.1)',
    outset: '2px 2px 4px rgba(0,0,0,0.2)'
  })

  // Generate Windows-style box shadows
  const getWindowsShadows = () => ({
    window: `0 8px 32px ${themes[currentTheme.value].shadowColor}`,
    button: `
      inset 1px 1px 2px rgba(255, 255, 255, 0.8),
      inset -1px -1px 2px rgba(0, 0, 0, 0.2),
      0 2px 4px rgba(0, 0, 0, 0.3)
    `,
    modal: `0 16px 64px ${themes[currentTheme.value].shadowColor}`
  })

  // Apply Windows-style scrollbar
  const applyWindowsScrollbar = () => {
    const style = document.createElement('style')
    style.textContent = `
      ::-webkit-scrollbar {
        width: 16px;
        height: 16px;
      }
      
      ::-webkit-scrollbar-track {
        background: ${themes[currentTheme.value].backgroundColor};
        border: 1px inset ${themes[currentTheme.value].borderColor};
      }
      
      ::-webkit-scrollbar-thumb {
        background: ${themes[currentTheme.value].borderColor};
        border: 1px outset ${themes[currentTheme.value].borderColor};
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: ${themes[currentTheme.value].primaryColor};
      }
      
      ::-webkit-scrollbar-corner {
        background: ${themes[currentTheme.value].backgroundColor};
      }
    `
    document.head.appendChild(style)
  }

  // Remove body scroll on Windows desktop
  const preventBodyScroll = () => {
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
  }

  // Restore body scroll
  const restoreBodyScroll = () => {
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
  }

  return {
    currentTheme,
    themes,
    applyWindowsTheme,
    getButtonColors,
    getWindowsGradients,
    getWindowsShadows,
    applyWindowsScrollbar,
    preventBodyScroll,
    restoreBodyScroll
  }
}