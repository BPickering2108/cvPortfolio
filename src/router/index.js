import { createRouter, createWebHistory } from 'vue-router'

// Import your existing login component
import FigmaLogin from '@/views/figmaLogin.vue'

// Import the real dashboard component
import RecruiterDashboard from '@/views/recruiterDashboard.vue'

// Create proper Vue components for the other dashboards
import { h } from 'vue'

const createDashboard = (title, description) => {
  return {
    setup() {
      return () => h('div', {
        style: {
          padding: '2rem',
          textAlign: 'center',
          color: 'white',
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }
      }, [
        h('h1', { style: { fontSize: '2.5rem', marginBottom: '1rem' } }, title),
        h('p', { style: { fontSize: '1.2rem', marginBottom: '2rem' } }, description),
        h('button', {
          style: {
            padding: '12px 24px',
            fontSize: '1rem',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '8px',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          },
          onClick: () => {
            // Navigate back to login
            window.history.back()
          }
        }, 'Back to Login')
      ])
    }
  }
}

// Create dashboard components for other user types
const PeerDashboard = createDashboard('Peer Dashboard', 'Welcome to the peer section!')
const VolunteeringDashboard = createDashboard('Volunteering Dashboard', 'Welcome to the volunteering section!')
const OtherDashboard = createDashboard('Other User Dashboard', 'Welcome to the other user section!')

const routes = [
  {
    path: '/',
    name: 'Login',
    component: FigmaLogin,
    meta: { transition: 'fade' }
  },
  {
    path: '/recruiter',
    name: 'Recruiter',
    component: RecruiterDashboard,
    meta: { transition: 'slide' }
  },
  {
    path: '/peer',
    name: 'Peer',
    component: PeerDashboard,
    meta: { transition: 'slide' }
  },
  {
    path: '/volunteering',
    name: 'Volunteering',
    component: VolunteeringDashboard,
    meta: { transition: 'slide' }
  },
  {
    path: '/other',
    name: 'Other',
    component: OtherDashboard,
    meta: { transition: 'slide' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router