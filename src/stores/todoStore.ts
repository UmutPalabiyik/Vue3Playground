import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Todo } from '../types/Todo'

export const useTodoStore = defineStore('todo', () => {
  // State
  const todos = ref<Todo[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters (computed)
  const completedTodos = computed(() => 
    todos.value.filter(todo => todo.completed)
  )
  
  const pendingTodos = computed(() => 
    todos.value.filter(todo => !todo.completed)
  )
  
  const totalTodos = computed(() => todos.value.length)
  
  const completionPercentage = computed(() => 
    totalTodos.value > 0 ? Math.round((completedTodos.value.length / totalTodos.value) * 100) : 0
  )

  // Actions
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date()
    }
    todos.value.push(newTodo)
  }

  const toggleTodo = (id: number) => {
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }

  const deleteTodo = (id: number) => {
    const index = todos.value.findIndex(t => t.id === id)
    if (index > -1) {
      todos.value.splice(index, 1)
    }
  }

  const clearCompleted = () => {
    todos.value = todos.value.filter(todo => !todo.completed)
  }

  const setLoading = (value: boolean) => {
    loading.value = value
  }

  const setError = (message: string | null) => {
    error.value = message
  }

  return {
    // State
    todos,
    loading,
    error,
    // Getters
    completedTodos,
    pendingTodos,
    totalTodos,
    completionPercentage,
    // Actions
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    setLoading,
    setError
  }
})
