
import { watchEffect } from 'vue'
import { useStore } from 'vuex'

export function useTheme() {
  const store = useStore()
  
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    store.commit('SET_THEME', savedTheme)
  }
  
  const toggleTheme = () => {
    const newTheme = store.state.theme === 'dark' ? 'light' : 'dark'
    store.commit('SET_THEME', newTheme)
    localStorage.setItem('theme', newTheme)
  }
  
  watchEffect(() => {
    document.documentElement.classList.toggle('dark', store.state.theme === 'dark')
  })
  
  return { initTheme, toggleTheme }
}