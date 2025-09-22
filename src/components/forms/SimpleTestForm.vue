<template>
  <v-card class="mx-auto" max-width="400">
    <v-card-title class="text-h5 text-center pa-6">
      <v-icon class="mr-2">mdi-test-tube</v-icon>
      Test Formu
    </v-card-title>

    <v-card-text>
      <v-form @submit.prevent="handleSubmit">
        <v-text-field
          v-model="formData.name"
          label="Ad"
          :rules="nameRules"
          variant="outlined"
          class="mb-3"
        />

        <v-text-field
          v-model="formData.email"
          label="E-posta"
          type="email"
          :rules="emailRules"
          variant="outlined"
          class="mb-3"
        />

        <v-btn
          type="submit"
          color="primary"
          :loading="isSubmitting"
          block
        >
          Test Et
        </v-btn>
      </v-form>

      <v-alert
        v-if="submitSuccess"
        type="success"
        variant="tonal"
        class="mt-4"
      >
        Form başarıyla gönderildi!
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  name: '',
  email: ''
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)

const nameRules = [
  (v: string) => !!v || 'Ad alanı zorunludur'
]

const emailRules = [
  (v: string) => !!v || 'E-posta alanı zorunludur',
  (v: string) => /.+@.+\..+/.test(v) || 'Geçerli e-posta giriniz'
]

const handleSubmit = () => {
  isSubmitting.value = true
  
  setTimeout(() => {
    isSubmitting.value = false
    submitSuccess.value = true
    console.log('Form data:', formData.value)
  }, 1000)
}
</script>

<style scoped>
.v-card-title {
  background: linear-gradient(135deg, #42b883, #369870);
  color: white;
}
</style>

