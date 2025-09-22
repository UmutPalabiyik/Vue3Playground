<template>
  <div class="todos">
    <div class="header">
      <h1>Todo Listesi</h1>
      <p>Vue.js reactive özellikleri ve Pinia state management</p>
    </div>

    <!-- Todo Form -->
    <div class="todo-form">
      <form @submit.prevent="addNewTodo">
        <input
          v-model="newTodoText"
          type="text"
          placeholder="Yeni todo ekle..."
          class="todo-input"
          :disabled="todoStore.loading"
        />
        <button 
          type="submit" 
          class="add-btn"
          :disabled="!newTodoText.trim() || todoStore.loading"
        >
          {{ todoStore.loading ? 'Ekleniyor...' : 'Ekle' }}
        </button>
      </form>
    </div>

    <!-- Error Message -->
    <div v-if="todoStore.error" class="error-message">
      {{ todoStore.error }}
    </div>

    <!-- Stats -->
    <div class="stats">
      <div class="stat">
        <span class="stat-number">{{ todoStore.totalTodos }}</span>
        <span class="stat-label">Toplam</span>
      </div>
      <div class="stat">
        <span class="stat-number">{{ todoStore.completedTodos.length }}</span>
        <span class="stat-label">Tamamlanan</span>
      </div>
      <div class="stat">
        <span class="stat-number">{{ todoStore.pendingTodos.length }}</span>
        <span class="stat-label">Bekleyen</span>
      </div>
      <div class="stat">
        <span class="stat-number">{{ todoStore.completionPercentage }}%</span>
        <span class="stat-label">Tamamlanma</span>
      </div>
    </div>

    <!-- Todo List -->
    <div class="todo-list">
      <div v-if="todoStore.todos.length === 0" class="empty-state">
        <p>Henüz todo eklenmemiş. Yukarıdan bir todo ekleyin!</p>
      </div>
      
      <div v-else>
        <div class="todo-item" v-for="todo in todoStore.todos" :key="todo.id">
          <div class="todo-content">
            <input
              type="checkbox"
              :checked="todo.completed"
              @change="todoStore.toggleTodo(todo.id)"
              class="todo-checkbox"
            />
            <span 
              class="todo-text"
              :class="{ completed: todo.completed }"
            >
              {{ todo.text }}
            </span>
            <span class="todo-date">
              {{ formatDate(todo.createdAt) }}
            </span>
          </div>
          <button 
            @click="todoStore.deleteTodo(todo.id)"
            class="delete-btn"
            title="Sil"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div v-if="todoStore.todos.length > 0" class="actions">
      <button 
        @click="todoStore.clearCompleted"
        class="clear-btn"
        :disabled="todoStore.completedTodos.length === 0"
      >
        Tamamlananları Temizle ({{ todoStore.completedTodos.length }})
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '../stores/todoStore'

const todoStore = useTodoStore()
const newTodoText = ref('')

const addNewTodo = () => {
  if (newTodoText.value.trim()) {
    todoStore.addTodo(newTodoText.value.trim())
    newTodoText.value = ''
  }
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}
</script>

<style scoped>
.todos {
  max-width: 800px;
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

.todo-form {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.todo-form form {
  display: flex;
  gap: 1rem;
}

.todo-input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.todo-input:focus {
  outline: none;
  border-color: #42b883;
}

.add-btn {
  background: #42b883;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;
}

.add-btn:hover:not(:disabled) {
  background: #369870;
}

.add-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  text-align: center;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stat-number {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  color: #42b883;
  margin-bottom: 0.25rem;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
}

.todo-list {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.empty-state {
  padding: 3rem;
  text-align: center;
  color: #666;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.3s ease;
}

.todo-item:hover {
  background: #f8f9fa;
}

.todo-item:last-child {
  border-bottom: none;
}

.todo-content {
  display: flex;
  align-items: center;
  flex: 1;
  gap: 1rem;
}

.todo-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.todo-text {
  flex: 1;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.todo-text.completed {
  text-decoration: line-through;
  color: #999;
}

.todo-date {
  font-size: 0.8rem;
  color: #999;
}

.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background 0.3s ease;
}

.delete-btn:hover {
  background: #fee;
}

.actions {
  margin-top: 2rem;
  text-align: center;
}

.clear-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;
}

.clear-btn:hover:not(:disabled) {
  background: #c0392b;
}

.clear-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
