import { ref, watch } from 'vue'

/**
 * LocalStorage ile reactive data senkronizasyonu için composable
 * VueUse kütüphanesinden esinlenilmiştir
 */
export function useLocalStorage<T>(key: string, defaultValue: T) {
  // LocalStorage'dan değeri oku
  const read = (): T => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  }

  // LocalStorage'a değeri yaz
  const write = (value: T) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('LocalStorage yazma hatası:', error)
    }
  }

  // Reactive ref oluştur
  const storedValue = ref<T>(read())

  // Değer değiştiğinde LocalStorage'ı güncelle
  watch(storedValue, write, { deep: true })

  return storedValue
}
