import { ref, computed } from 'vue'
import axios, { type AxiosResponse } from 'axios'

/**
 * API çağrıları için generic composable
 * Loading, error ve data state'lerini yönetir
 */
export function useApi<T>() {
  const data = ref<T | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isSuccess = computed(() => !loading.value && !error.value && data.value !== null)
  const isEmpty = computed(() => !loading.value && !error.value && data.value === null)

  const execute = async (apiCall: () => Promise<AxiosResponse<T>>) => {
    try {
      loading.value = true
      error.value = null
      
      const response = await apiCall()
      data.value = response.data
      
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || err.message || 'Bir hata oluştu'
      data.value = null
      throw err
    } finally {
      loading.value = false
    }
  }

  const reset = () => {
    data.value = null
    loading.value = false
    error.value = null
  }

  return {
    data,
    loading,
    error,
    isSuccess,
    isEmpty,
    execute,
    reset
  }
}
