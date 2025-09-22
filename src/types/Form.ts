export interface UserForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: 'male' | 'female' | 'other'
  country: string
  city: string
  address: string
  zipCode: string
  bio: string
  interests: string[]
  newsletter: boolean
  terms: boolean
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
  priority: 'low' | 'medium' | 'high'
  category: 'general' | 'support' | 'sales' | 'feedback'
  phone?: string
  company?: string
}

export interface LoginForm {
  email: string
  password: string
  rememberMe: boolean
  twoFactorCode?: string
}

export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'tel' | 'date' | 'select' | 'textarea' | 'checkbox' | 'radio'
  required?: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
  validation?: {
    min?: number
    max?: number
    pattern?: RegExp
    custom?: (value: any) => boolean | string
  }
}

export interface FormConfig {
  title: string
  description: string
  fields: FormField[]
  submitText: string
  resetText?: string
}

