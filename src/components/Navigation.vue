<template>
  <nav class="navigation">
    <div class="nav-brand">
      <router-link to="/" class="brand-link">
        <span class="brand-icon">⚡</span>
        <span class="brand-text">Vue Playground</span>
      </router-link>
    </div>
    
    <div class="nav-links">
      <router-link 
        v-for="link in navLinks" 
        :key="link.path"
        :to="link.path" 
        class="nav-link"
        :class="{ active: $route.path === link.path }"
      >
        <span class="nav-icon">{{ link.icon }}</span>
        <span class="nav-text">{{ link.label }}</span>
      </router-link>
    </div>

    <div class="nav-stats">
      <div class="stat-item">
        <span class="stat-icon">📝</span>
        <span class="stat-value">{{ todoCount }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-icon">👥</span>
        <span class="stat-value">{{ userCount }}</span>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTodoStore } from '../stores/todoStore'
import { useUserStore } from '../stores/userStore'

const todoStore = useTodoStore()
const userStore = useUserStore()

const navLinks = [
  { path: '/', label: 'Ana Sayfa', icon: '🏠' },
  { path: '/todos', label: 'Todo Listesi', icon: '📝' },
  { path: '/users', label: 'Kullanıcılar', icon: '👥' },
  { path: '/about', label: 'Hakkında', icon: 'ℹ️' }
]

const todoCount = computed(() => todoStore.totalTodos)
const userCount = computed(() => userStore.userCount)
</script>

<style scoped>
.navigation {
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-brand {
  display: flex;
  align-items: center;
}

.brand-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #42b883;
  font-weight: bold;
  font-size: 1.2rem;
}

.brand-icon {
  font-size: 1.5rem;
  margin-right: 0.5rem;
}

.brand-text {
  font-size: 1.1rem;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #666;
  border-radius: 6px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  background: #f8f9fa;
  color: #42b883;
}

.nav-link.active {
  background: #42b883;
  color: white;
}

.nav-icon {
  margin-right: 0.5rem;
  font-size: 1rem;
}

.nav-text {
  font-size: 0.9rem;
  font-weight: 500;
}

.nav-stats {
  display: flex;
  gap: 1rem;
}

.stat-item {
  display: flex;
  align-items: center;
  background: #f8f9fa;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.stat-icon {
  margin-right: 0.25rem;
}

.stat-value {
  font-weight: bold;
  color: #42b883;
}

@media (max-width: 768px) {
  .navigation {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .nav-stats {
    justify-content: center;
  }
}
</style>
