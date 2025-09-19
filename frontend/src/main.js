import { createApp } from 'vue'
import './assets/tailwind.css'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/authStore'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

const authStore = useAuthStore()

// A function to initialize the app
async function initializeApp() {
  if (authStore.token) {
    // If a token exists, set the auth header and fetch the user
    authStore.setAuthHeader();
    await authStore.fetchUser();
  }

  app.use(router)
  app.mount('#app')
}

initializeApp()
