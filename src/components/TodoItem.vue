<template>
  <div class="todo-item" :class="{ completed: todo.completed }">
    <div class="todo-content">
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="$emit('toggle', todo.id)"
        class="todo-checkbox"
      />
      <span class="todo-text">{{ todo.text }}</span>
      <span class="todo-date">{{ formatDate(todo.createdAt) }}</span>
    </div>
    <div class="todo-actions">
      <button 
        @click="$emit('delete', todo.id)"
        class="delete-btn"
        title="Sil"
      >
        🗑️
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Todo } from '../types/Todo'

// Props tanımı
defineProps<{
  todo: Todo
}>()

// Emits tanımı
defineEmits<{
  toggle: [id: number]
  delete: [id: number]
}>()

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
.todo-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  background: white;
}

.todo-item:hover {
  background: #f8f9fa;
}

.todo-item.completed {
  opacity: 0.7;
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
  accent-color: #42b883;
}

.todo-text {
  flex: 1;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: #999;
}

.todo-date {
  font-size: 0.8rem;
  color: #999;
  white-space: nowrap;
}

.todo-actions {
  display: flex;
  gap: 0.5rem;
}

.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background 0.3s ease;
  opacity: 0.7;
}

.delete-btn:hover {
  background: #fee;
  opacity: 1;
}
</style>
