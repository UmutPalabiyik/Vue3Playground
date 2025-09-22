import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import type { User } from '../types/User'

export const useUserStore = defineStore('user', () => {
  // State
  const users = ref<User[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const selectedUser = ref<User | null>(null)

  // Getters
  const userCount = computed(() => users.value.length)
  
  const activeUsers = computed(() => 
    users.value.filter(user => user.status === 'active')
  )

  // Actions
  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // JSONPlaceholder API'sinden kullanıcıları çek
      const response = await axios.get('https://jsonplaceholder.typicode.com/users')
      users.value = response.data.map((user: any) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        website: user.website,
        status: Math.random() > 0.5 ? 'active' : 'inactive',
        address: {
          street: user.address.street,
          city: user.address.city,
          zipcode: user.address.zipcode
        }
      }))
    } catch (err) {
      setError('Kullanıcılar yüklenirken hata oluştu')
      console.error('Error fetching users:', err)
    } finally {
      setLoading(false)
    }
  }

  const selectUser = (user: User) => {
    selectedUser.value = user
  }

  const clearSelectedUser = () => {
    selectedUser.value = null
  }

  const setLoading = (value: boolean) => {
    loading.value = value
  }

  const setError = (message: string | null) => {
    error.value = message
  }

  return {
    // State
    users,
    loading,
    error,
    selectedUser,
    // Getters
    userCount,
    activeUsers,
    // Actions
    fetchUsers,
    selectUser,
    clearSelectedUser,
    setLoading,
    setError
  }
})
