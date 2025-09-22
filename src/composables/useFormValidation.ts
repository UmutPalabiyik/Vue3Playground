import { ref, computed } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

// Yup şemaları
export const userFormSchema = yup.object({
  firstName: yup.string().required('Ad alanı zorunludur').min(2, 'Ad en az 2 karakter olmalıdır'),
  lastName: yup.string().required('Soyad alanı zorunludur').min(2, 'Soyad en az 2 karakter olmalıdır'),
  email: yup.string().required('E-posta alanı zorunludur').email('Geçerli bir e-posta adresi giriniz'),
  phone: yup.string().required('Telefon alanı zorunludur').matches(/^[0-9+\-\s()]+$/, 'Geçerli bir telefon numarası giriniz'),
  dateOfBirth: yup.date().required('Doğum tarihi zorunludur').max(new Date(), 'Doğum tarihi gelecekte olamaz'),
  gender: yup.string().required('Cinsiyet seçimi zorunludur').oneOf(['male', 'female', 'other'], 'Geçerli bir cinsiyet seçiniz'),
  country: yup.string().required('Ülke seçimi zorunludur'),
  city: yup.string().required('Şehir alanı zorunludur').min(2, 'Şehir en az 2 karakter olmalıdır'),
  address: yup.string().required('Adres alanı zorunludur').min(10, 'Adres en az 10 karakter olmalıdır'),
  zipCode: yup.string().required('Posta kodu zorunludur').matches(/^[0-9]{5}$/, 'Posta kodu 5 haneli olmalıdır'),
  bio: yup.string().max(500, 'Biyografi en fazla 500 karakter olabilir'),
  interests: yup.array().min(1, 'En az bir ilgi alanı seçiniz'),
  newsletter: yup.boolean(),
  terms: yup.boolean().oneOf([true], 'Kullanım şartlarını kabul etmelisiniz')
})

export const contactFormSchema = yup.object({
  name: yup.string().required('Ad alanı zorunludur').min(2, 'Ad en az 2 karakter olmalıdır'),
  email: yup.string().required('E-posta alanı zorunludur').email('Geçerli bir e-posta adresi giriniz'),
  subject: yup.string().required('Konu alanı zorunludur').min(5, 'Konu en az 5 karakter olmalıdır'),
  message: yup.string().required('Mesaj alanı zorunludur').min(20, 'Mesaj en az 20 karakter olmalıdır'),
  priority: yup.string().required('Öncelik seçimi zorunludur').oneOf(['low', 'medium', 'high']),
  category: yup.string().required('Kategori seçimi zorunludur').oneOf(['general', 'support', 'sales', 'feedback']),
  phone: yup.string().matches(/^[0-9+\-\s()]+$/, 'Geçerli bir telefon numarası giriniz'),
  company: yup.string().min(2, 'Şirket adı en az 2 karakter olmalıdır')
})

export const loginFormSchema = yup.object({
  email: yup.string().required('E-posta alanı zorunludur').email('Geçerli bir e-posta adresi giriniz'),
  password: yup.string().required('Şifre alanı zorunludur').min(6, 'Şifre en az 6 karakter olmalıdır'),
  rememberMe: yup.boolean(),
  twoFactorCode: yup.string().when('$requiresTwoFactor', {
    is: true,
    then: (schema) => schema.required('2FA kodu zorunludur').length(6, '2FA kodu 6 haneli olmalıdır'),
    otherwise: (schema) => schema.optional()
  })
})

// Form composable
export function useFormValidation<T extends Record<string, any>>(
  schema: yup.ObjectSchema<any>,
  initialValues: T
) {
  const { handleSubmit, errors, meta, resetForm, setValues } = useForm<T>({
    validationSchema: schema,
    initialValues
  })

  const isSubmitting = ref(false)
  const submitSuccess = ref(false)

  const isFormValid = computed(() => meta.value.valid && !isSubmitting.value)
  const hasErrors = computed(() => Object.keys(errors.value).length > 0)

  const submit = async (onSubmit: (values: T) => Promise<void> | void) => {
    try {
      isSubmitting.value = true
      submitSuccess.value = false

      await handleSubmit(async (values) => {
        await onSubmit(values)
        submitSuccess.value = true
      })()
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      isSubmitting.value = false
    }
  }

  const reset = () => {
    resetForm()
    submitSuccess.value = false
  }

  const updateValues = (newValues: Partial<T>) => {
    setValues({ ...initialValues, ...newValues })
  }

  return {
    errors,
    meta,
    isSubmitting,
    submitSuccess,
    isFormValid,
    hasErrors,
    submit,
    reset,
    updateValues
  }
}

// Field composable
export function useFieldValidation(name: string, rules: any) {
  const { value, errorMessage, meta } = useField(name, rules)

  const hasError = computed(() => !!errorMessage.value)
  const isValid = computed(() => meta.value.valid && meta.value.touched)

  return {
    value,
    errorMessage,
    hasError,
    isValid,
    meta
  }
}

