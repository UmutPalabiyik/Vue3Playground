<template>
  <div class="home">
    <div class="hero">
      <h1>Vue.js Mini Uygulaması</h1>
      <p>Vue.js'in temel özelliklerini öğrenmek için tasarlanmış kapsamlı bir demo uygulaması</p>
    </div>

    <div class="features">
      <div class="feature-card">
        <h3>🎯 Vue Router</h3>
        <p>Sayfa yönlendirmesi ve SPA (Single Page Application) yapısı</p>
        <router-link to="/todos" class="btn">Todo Listesi</router-link>
      </div>

      <div class="feature-card">
        <h3>📦 Pinia Store</h3>
        <p>Modern state management ve reactive data handling</p>
        <router-link to="/users" class="btn">Kullanıcılar</router-link>
      </div>

      <div class="feature-card">
        <h3>🌐 API Entegrasyonu</h3>
        <p>Axios ile HTTP istekleri ve async data fetching</p>
        <router-link to="/about" class="btn">Hakkında</router-link>
      </div>
    </div>

    <div class="stats">
      <h2>Uygulama İstatistikleri</h2>
      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-number">{{ todoStats.totalTodos }}</span>
          <span class="stat-label">Toplam Todo</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">{{ todoStats.completedTodos }}</span>
          <span class="stat-label">Tamamlanan</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">{{ userStats.userCount }}</span>
          <span class="stat-label">Kullanıcı</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">{{ todoStats.completionPercentage }}%</span>
          <span class="stat-label">Tamamlanma Oranı</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTodoStore } from '../stores/todoStore'
import { useUserStore } from '../stores/userStore'

const todoStore = useTodoStore()
const userStore = useUserStore()

const todoStats = computed(() => ({
  totalTodos: todoStore.totalTodos,
  completedTodos: todoStore.completedTodos.length,
  completionPercentage: todoStore.completionPercentage
}))

const userStats = computed(() => ({
  userCount: userStore.userCount
}))
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero {
  text-align: center;
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 3rem;
  color: #42b883;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.feature-card p {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.btn {
  display: inline-block;
  background: #42b883;
  color: white;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  border-radius: 6px;
  transition: background 0.3s ease;
}

.btn:hover {
  background: #369870;
}

.stats {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
}

.stats h2 {
  margin-bottom: 2rem;
  color: #2c3e50;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #42b883;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
}
</style>
