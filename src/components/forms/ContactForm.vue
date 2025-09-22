<template>
  <v-card class="mx-auto" max-width="600">
    <v-card-title class="text-h5 text-center pa-6">
      <v-icon class="mr-2">mdi-email</v-icon>
      İletişim Formu
    </v-card-title>

    <v-card-subtitle class="text-center pb-4">
      Sorularınız için bizimle iletişime geçin
    </v-card-subtitle>

    <v-card-text>
      <v-form @submit.prevent="handleSubmit">
        <v-row>
          <v-col cols="12" md="6">
            <BaseFormField
              name="name"
              label="Ad Soyad"
              type="text"
              :required="true"
              placeholder="Adınızı ve soyadınızı giriniz"
              prepend-icon="mdi-account"
              :rules="nameRules"
            />
          </v-col>

          <v-col cols="12" md="6">
            <BaseFormField
              name="email"
              label="E-posta"
              type="email"
              :required="true"
              placeholder="ornek@email.com"
              prepend-icon="mdi-email"
              :rules="emailRules"
            />
          </v-col>

          <v-col cols="12" md="6">
            <BaseFormField
              name="phone"
              label="Telefon (Opsiyonel)"
              type="tel"
              placeholder="+90 555 123 45 67"
              prepend-icon="mdi-phone"
              :rules="phoneRules"
            />
          </v-col>

          <v-col cols="12" md="6">
            <BaseFormField
              name="company"
              label="Şirket (Opsiyonel)"
              type="text"
              placeholder="Şirket adınız"
              prepend-icon="mdi-office-building"
              :rules="companyRules"
            />
          </v-col>

          <v-col cols="12">
            <BaseFormField
              name="subject"
              label="Konu"
              type="text"
              :required="true"
              placeholder="Mesajınızın konusunu belirtin"
              prepend-icon="mdi-subject"
              :rules="subjectRules"
            />
          </v-col>

          <v-col cols="12" md="6">
            <BaseFormField
              name="category"
              label="Kategori"
              type="select"
              :required="true"
              :options="categoryOptions"
              :rules="categoryRules"
            />
          </v-col>

          <v-col cols="12" md="6">
            <BaseFormField
              name="priority"
              label="Öncelik"
              type="select"
              :required="true"
              :options="priorityOptions"
              :rules="priorityRules"
            />
          </v-col>

          <v-col cols="12">
            <BaseFormField
              name="message"
              label="Mesaj"
              type="textarea"
              :required="true"
              placeholder="Mesajınızı detaylı bir şekilde yazın..."
              :rules="messageRules"
            />
          </v-col>
        </v-row>

        <!-- Form Actions -->
        <v-card-actions class="pa-6">
          <v-spacer></v-spacer>
          <v-btn
            color="grey"
            variant="outlined"
            @click="resetForm"
            :disabled="isSubmitting"
          >
            <v-icon class="mr-2">mdi-refresh</v-icon>
            Temizle
          </v-btn>
          <v-btn
            color="primary"
            type="submit"
            :loading="isSubmitting"
            :disabled="!isFormValid"
          >
            <v-icon class="mr-2">mdi-send</v-icon>
            Gönder
          </v-btn>
        </v-card-actions>
      </v-form>

      <!-- Success Message -->
      <v-alert
        v-if="submitSuccess"
        type="success"
        variant="tonal"
        class="ma-4"
        closable
        @click:close="submitSuccess = false"
      >
        <v-icon class="mr-2">mdi-check-circle</v-icon>
        Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useFormValidation, contactFormSchema } from '../../composables/useFormValidation'
import type { ContactForm } from '../../types/Form'
import BaseFormField from './BaseFormField.vue'

// Form initial values
const initialValues: ContactForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
  priority: 'medium',
  category: 'general',
  phone: '',
  company: ''
}

// Form validation
const { errors, isSubmitting, submitSuccess, isFormValid, submit, reset } = useFormValidation(
  contactFormSchema,
  initialValues
)

// Options
const categoryOptions = [
  { value: 'general', label: 'Genel' },
  { value: 'support', label: 'Destek' },
  { value: 'sales', label: 'Satış' },
  { value: 'feedback', label: 'Geri Bildirim' }
]

const priorityOptions = [
  { value: 'low', label: 'Düşük' },
  { value: 'medium', label: 'Orta' },
  { value: 'high', label: 'Yüksek' }
]

// Validation rules
const nameRules = [(v: string) => !!v || 'Ad alanı zorunludur']
const emailRules = [
  (v: string) => !!v || 'E-posta alanı zorunludur',
  (v: string) => /.+@.+\..+/.test(v) || 'Geçerli bir e-posta adresi giriniz'
]
const phoneRules = [
  (v: string) => !v || /^[0-9+\-\s()]+$/.test(v) || 'Geçerli bir telefon numarası giriniz'
]
const companyRules = [
  (v: string) => !v || v.length >= 2 || 'Şirket adı en az 2 karakter olmalıdır'
]
const subjectRules = [
  (v: string) => !!v || 'Konu alanı zorunludur',
  (v: string) => v.length >= 5 || 'Konu en az 5 karakter olmalıdır'
]
const categoryRules = [(v: string) => !!v || 'Kategori seçimi zorunludur']
const priorityRules = [(v: string) => !!v || 'Öncelik seçimi zorunludur']
const messageRules = [
  (v: string) => !!v || 'Mesaj alanı zorunludur',
  (v: string) => v.length >= 20 || 'Mesaj en az 20 karakter olmalıdır'
]

// Methods
const handleSubmit = () => {
  submit(async (values) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('Contact form submitted:', values)
  })
}

const resetForm = () => {
  reset()
}
</script>

<style scoped>
.v-card-title {
  background: linear-gradient(135deg, #42b883, #369870);
  color: white;
}
</style>

