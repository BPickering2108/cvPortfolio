<template>
  <div class="profile-container" :style="backgroundStyle">
    <!-- Main Recruiter Card (centered top) -->
    <div class="profile-card recruiter-card" @click="navigateToProfile('recruiter')">
      <div class="profile-avatar">
        <div class="avatar-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
      </div>
      <h3 class="profile-title">Recruiter</h3>
    </div>

    <!-- Peer Card (left middle) -->
    <div class="profile-card side-card peer-card" @click="navigateToProfile('peer')">
      <div class="profile-avatar small">
        <div class="avatar-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
      </div>
      <h3 class="profile-title">Peer</h3>
    </div>

    <!-- Volunteering Card (left bottom) -->
    <div class="profile-card side-card volunteering-card" @click="navigateToProfile('volunteering')">
      <div class="profile-avatar small">
        <div class="avatar-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
      </div>
      <h3 class="profile-title">Volunteering</h3>
    </div>

    <!-- Other User Card (left bottom) -->
    <div class="profile-card side-card other-user-card" @click="navigateToProfile('other')">
      <div class="profile-avatar small">
        <div class="avatar-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
      </div>
      <h3 class="profile-title">Other User</h3>
    </div>

    <!-- Power Off Button -->
    <button @click="powerOff" class="power-off-button">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="power-icon">
        <path d="M18.36 6.64a9 9 0 1 1-12.73 0"/>
        <line x1="12" y1="2" x2="12" y2="12"/>
      </svg>
    </button>

    <!-- Power Off Overlay -->
    <div v-if="isPoweringOff" class="power-off-overlay">
      <div class="tv-shrink-effect"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// Try to import the background image, with fallback
let backgroundImage
try {
  backgroundImage = require('@/assets/images/loginBackground.png')
} catch (error) {
  console.warn('Background image not found, using fallback')
  backgroundImage = null
}

const router = useRouter()
const isPoweringOff = ref(false)

// Computed property for background style with fallback
const backgroundStyle = computed(() => {
  if (backgroundImage) {
    return {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }
  } else {
    // Fallback gradient background
    return {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }
  }
})

const navigateToProfile = (profileType) => {
  router.push(`/${profileType}`)
}

const powerOff = () => {
  isPoweringOff.value = true
  
  // Navigate to the URL after the animation completes
  setTimeout(() => {
    window.location.href = 'https://pickering.cloud'
  }, 800) // Match the animation duration
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

.profile-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.profile-card {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.profile-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.recruiter-card {
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  width: 280px;
  height: 200px;
}

.recruiter-card:hover {
  transform: translateX(-50%) translateY(-4px);
}

/* Side Cards - Horizontal Layout */
.side-card {
  flex-direction: row;
  align-items: center;
  gap: 20px;
  width: 240px;
  height: 80px;
  padding: 16px 24px;
}

/* Peer Card - Left Middle */
.peer-card {
  top: 60%;
  left: 8%;
}

/* Volunteering Card - Left Bottom */
.volunteering-card {
  top: 70%;
  left: 8%;
}

/* Other User Card - Left Bottom */
.other-user-card {
  top: 80%;
  left: 8%;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.profile-avatar.small {
  width: 60px;
  height: 60px;
}

.avatar-icon {
  width: 40px;
  height: 40px;
  color: white;
  opacity: 0.9;
}

.profile-avatar.small .avatar-icon {
  width: 30px;
  height: 30px;
}

.profile-title {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 24px;
  color: white;
  margin: 0;
  text-align: center;
}

.side-card .profile-title {
  font-size: 18px;
  text-align: left;
  margin: 0;
}

/* Power Off Button Styles */
.power-off-button {
  position: absolute;
  bottom: 32px;
  right: 32px;
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
  z-index: 10;
}

.power-off-button:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.power-icon {
  width: 24px;
  height: 24px;
  color: white;
  opacity: 0.9;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Power Off Animation */
.power-off-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: black;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tv-shrink-effect {
  width: 100vw;
  height: 100vh;
  background: white;
  animation: tvShrink 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

@keyframes tvShrink {
  0% {
    width: 100vw;
    height: 100vh;
    opacity: 1;
  }
  70% {
    width: 100vw;
    height: 4px;
    opacity: 0.8;
  }
  85% {
    width: 200px;
    height: 4px;
    opacity: 0.6;
  }
  100% {
    width: 0;
    height: 0;
    opacity: 0;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .recruiter-card {
    top: 10%;
    width: 240px;
    height: 180px;
  }

  .peer-card {
    top: 60%;
    left: 5%;
  }

  .volunteering-card {
    top: 70%;
    left: 5%;
  }

  .other-user-card {
    top: 80%;
    left: 5%;
  }
  
  .profile-title {
    font-size: 20px;
  }
  
  .side-card {
    width: 200px;
    height: 70px;
    gap: 16px;
    padding: 12px 20px;
  }
  
  .side-card .profile-title {
    font-size: 16px;
  }

  .power-off-button {
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
  }

  .power-icon {
    width: 20px;
    height: 20px;
  }
}
</style>