import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UserForm, ContactForm, LoginForm } from '../types/Form'

export const useFormStore = defineStore('form', () => {
  // State
  const forms = ref<{
    user: UserForm | null
    contact: ContactForm | null
    login: LoginForm | null
  }>({
    user: null,
    contact: null,
    login: null
  })

  const formErrors = ref<Record<string, string[]>>({})
  const isSubmitting = ref(false)
  const submitSuccess = ref(false)

  // Getters
  const hasErrors = computed(() => 
    Object.keys(formErrors.value).length > 0
  )

  const isFormValid = computed(() => 
    !hasErrors.value && !isSubmitting.value
  )

  // Actions
  const setFormData = <T extends keyof typeof forms.value>(
    formType: T, 
    data: typeof forms.value[T]
  ) => {
    forms.value[formType] = data
  }

  const setFormErrors = (errors: Record<string, string[]>) => {
    formErrors.value = errors
  }

  const clearFormErrors = () => {
    formErrors.value = {}
  }

  const setSubmitting = (value: boolean) => {
    isSubmitting.value = value
  }

  const setSubmitSuccess = (value: boolean) => {
    submitSuccess.value = value
  }

  const resetForm = (formType: keyof typeof forms.value) => {
    forms.value[formType] = null
    clearFormErrors()
    setSubmitSuccess(false)
  }

  const submitForm = async <T extends keyof typeof forms.value>(
    formType: T,
    submitFn: (data: NonNullable<typeof forms.value[T]>) => Promise<void>
  ) => {
    try {
      setSubmitting(true)
      clearFormErrors()
      setSubmitSuccess(false)

      const formData = forms.value[formType]
      if (!formData) {
        throw new Error('Form verisi bulunamadı')
      }

      await submitFn(formData as NonNullable<typeof forms.value[T]>)
      setSubmitSuccess(true)
    } catch (error: any) {
      console.error('Form gönderim hatası:', error)
      if (error.errors) {
        setFormErrors(error.errors)
      }
    } finally {
      setSubmitting(false)
    }
  }

  return {
    // State
    forms,
    formErrors,
    isSubmitting,
    submitSuccess,
    // Getters
    hasErrors,
    isFormValid,
    // Actions
    setFormData,
    setFormErrors,
    clearFormErrors,
    setSubmitting,
    setSubmitSuccess,
    resetForm,
    submitForm
  }
})

