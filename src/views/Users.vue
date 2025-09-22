<template>
  <div class="users">
    <div class="header">
      <h1>Kullanıcı Listesi</h1>
      <p>Axios ile API entegrasyonu ve async data fetching</p>
    </div>

    <!-- Loading State -->
    <div v-if="userStore.loading" class="loading">
      <div class="spinner"></div>
      <p>Kullanıcılar yükleniyor...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="userStore.error" class="error">
      <p>{{ userStore.error }}</p>
      <button @click="userStore.fetchUsers" class="retry-btn">Tekrar Dene</button>
    </div>

    <!-- Users Content -->
    <div v-else>
      <!-- Stats -->
      <div class="stats">
        <div class="stat">
          <span class="stat-number">{{ userStore.userCount }}</span>
          <span class="stat-label">Toplam Kullanıcı</span>
        </div>
        <div class="stat">
          <span class="stat-number">{{ userStore.activeUsers.length }}</span>
          <span class="stat-label">Aktif Kullanıcı</span>
        </div>
        <div class="stat">
          <span class="stat-number">{{ userStore.userCount - userStore.activeUsers.length }}</span>
          <span class="stat-label">Pasif Kullanıcı</span>
        </div>
      </div>

      <!-- Refresh Button -->
      <div class="actions">
        <button @click="userStore.fetchUsers" class="refresh-btn">
          🔄 Kullanıcıları Yenile
        </button>
      </div>

      <!-- Users Grid -->
      <div class="users-grid">
        <div 
          v-for="user in userStore.users" 
          :key="user.id"
          class="user-card"
          :class="{ active: user.status === 'active' }"
          @click="selectUser(user)"
        >
          <div class="user-avatar">
            {{ user.name.charAt(0).toUpperCase() }}
          </div>
          <div class="user-info">
            <h3>{{ user.name }}</h3>
            <p class="user-email">{{ user.email }}</p>
            <p class="user-phone">{{ user.phone }}</p>
            <p class="user-website">{{ user.website }}</p>
            <div class="user-status">
              <span 
                class="status-badge"
                :class="user.status"
              >
                {{ user.status === 'active' ? 'Aktif' : 'Pasif' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- User Detail Modal -->
    <div v-if="userStore.selectedUser" class="modal-overlay" @click="userStore.clearSelectedUser">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h2>{{ userStore.selectedUser.name }}</h2>
          <button @click="userStore.clearSelectedUser" class="close-btn">×</button>
        </div>
        <div class="modal-content">
          <div class="detail-group">
            <h3>İletişim Bilgileri</h3>
            <p><strong>Email:</strong> {{ userStore.selectedUser.email }}</p>
            <p><strong>Telefon:</strong> {{ userStore.selectedUser.phone }}</p>
            <p><strong>Website:</strong> 
              <a :href="'https://' + userStore.selectedUser.website" target="_blank">
                {{ userStore.selectedUser.website }}
              </a>
            </p>
          </div>
          <div class="detail-group">
            <h3>Adres Bilgileri</h3>
            <p><strong>Sokak:</strong> {{ userStore.selectedUser.address.street }}</p>
            <p><strong>Şehir:</strong> {{ userStore.selectedUser.address.city }}</p>
            <p><strong>Posta Kodu:</strong> {{ userStore.selectedUser.address.zipcode }}</p>
          </div>
          <div class="detail-group">
            <h3>Durum</h3>
            <span 
              class="status-badge large"
              :class="userStore.selectedUser.status"
            >
              {{ userStore.selectedUser.status === 'active' ? 'Aktif Kullanıcı' : 'Pasif Kullanıcı' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()

const selectUser = (user: any) => {
  userStore.selectUser(user)
}

onMounted(() => {
  if (userStore.users.length === 0) {
    userStore.fetchUsers()
  }
})
</script>

<style scoped>
.users {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.header h1 {
  color: #42b883;
  margin-bottom: 0.5rem;
}

.header p {
  color: #666;
}

.loading {
  text-align: center;
  padding: 3rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #42b883;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  text-align: center;
  padding: 3rem;
  background: #fee;
  border-radius: 8px;
  color: #c33;
}

.retry-btn {
  background: #42b883;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 1rem;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  color: #42b883;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
}

.actions {
  text-align: center;
  margin-bottom: 2rem;
}

.refresh-btn {
  background: #42b883;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;
}

.refresh-btn:hover {
  background: #369870;
}

.users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.user-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.user-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.user-card.active {
  border-color: #42b883;
}

.user-avatar {
  width: 60px;
  height: 60px;
  background: #42b883;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 auto 1rem;
}

.user-info h3 {
  margin-bottom: 0.5rem;
  color: #2c3e50;
  text-align: center;
}

.user-email, .user-phone, .user-website {
  margin: 0.25rem 0;
  color: #666;
  font-size: 0.9rem;
  text-align: center;
}

.user-status {
  text-align: center;
  margin-top: 1rem;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
}

.status-badge.active {
  background: #d4edda;
  color: #155724;
}

.status-badge.inactive {
  background: #f8d7da;
  color: #721c24;
}

.status-badge.large {
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  margin: 0;
  color: #2c3e50;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}

.modal-content {
  padding: 1.5rem;
}

.detail-group {
  margin-bottom: 1.5rem;
}

.detail-group h3 {
  color: #42b883;
  margin-bottom: 0.5rem;
}

.detail-group p {
  margin: 0.25rem 0;
  color: #666;
}

.detail-group a {
  color: #42b883;
  text-decoration: none;
}

.detail-group a:hover {
  text-decoration: underline;
}
</style>
