<template>
  <v-card class="mx-auto" max-width="400">
    <v-card-title class="text-h5 text-center pa-6">
      <v-icon class="mr-2">mdi-login</v-icon>
      Giriş Yap
    </v-card-title>

    <v-card-subtitle class="text-center pb-4">
      Hesabınıza giriş yapın
    </v-card-subtitle>

    <v-card-text>
      <v-form @submit.prevent="handleSubmit">
        <BaseFormField
          name="email"
          label="E-posta"
          type="email"
          :required="true"
          placeholder="ornek@email.com"
          prepend-icon="mdi-email"
          :rules="emailRules"
        />

        <BaseFormField
          name="password"
          label="Şifre"
          type="password"
          :required="true"
          placeholder="Şifrenizi giriniz"
          prepend-icon="mdi-lock"
          :rules="passwordRules"
        />

        <v-checkbox
          v-model="rememberMe"
          label="Beni hatırla"
          color="primary"
          class="mb-4"
        />

        <!-- 2FA Field (conditional) -->
        <BaseFormField
          v-if="showTwoFactor"
          name="twoFactorCode"
          label="2FA Kodu"
          type="text"
          :required="true"
          placeholder="6 haneli kodu giriniz"
          prepend-icon="mdi-shield-key"
          :rules="twoFactorRules"
        />

        <!-- Form Actions -->
        <v-card-actions class="px-0">
          <v-spacer></v-spacer>
          <v-btn
            color="grey"
            variant="text"
            @click="resetForm"
            :disabled="isSubmitting"
          >
            Temizle
          </v-btn>
          <v-btn
            color="primary"
            type="submit"
            :loading="isSubmitting"
            :disabled="!isFormValid"
            block
          >
            <v-icon class="mr-2">mdi-login</v-icon>
            Giriş Yap
          </v-btn>
        </v-card-actions>
      </v-form>

      <!-- Success Message -->
      <v-alert
        v-if="submitSuccess"
        type="success"
        variant="tonal"
        class="mt-4"
        closable
        @click:close="submitSuccess = false"
      >
        <v-icon class="mr-2">mdi-check-circle</v-icon>
        Başarıyla giriş yaptınız!
      </v-alert>

      <!-- Error Message -->
      <v-alert
        v-if="loginError"
        type="error"
        variant="tonal"
        class="mt-4"
        closable
        @click:close="loginError = ''"
      >
        <v-icon class="mr-2">mdi-alert-circle</v-icon>
        {{ loginError }}
      </v-alert>
    </v-card-text>

    <!-- Additional Actions -->
    <v-card-actions class="flex-column pa-4">
      <v-btn
        color="primary"
        variant="text"
        @click="forgotPassword"
        class="mb-2"
      >
        <v-icon class="mr-2">mdi-lock-reset</v-icon>
        Şifremi Unuttum
      </v-btn>
      
      <v-divider class="my-2"></v-divider>
      
      <v-btn
        color="secondary"
        variant="text"
        @click="goToRegister"
      >
        <v-icon class="mr-2">mdi-account-plus</v-icon>
        Hesap Oluştur
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFormValidation, loginFormSchema } from '../../composables/useFormValidation'
import type { LoginForm } from '../../types/Form'
import BaseFormField from './BaseFormField.vue'

// Form initial values
const initialValues: LoginForm = {
  email: '',
  password: '',
  rememberMe: false,
  twoFactorCode: ''
}

// Form validation
const { errors, isSubmitting, submitSuccess, isFormValid, submit, reset } = useFormValidation(
  loginFormSchema,
  initialValues
)

// Additional state
const rememberMe = ref(false)
const showTwoFactor = ref(false)
const loginError = ref('')

// Validation rules
const emailRules = [
  (v: string) => !!v || 'E-posta alanı zorunludur',
  (v: string) => /.+@.+\..+/.test(v) || 'Geçerli bir e-posta adresi giriniz'
]

const passwordRules = [
  (v: string) => !!v || 'Şifre alanı zorunludur',
  (v: string) => v.length >= 6 || 'Şifre en az 6 karakter olmalıdır'
]

const twoFactorRules = [
  (v: string) => !!v || '2FA kodu zorunludur',
  (v: string) => /^[0-9]{6}$/.test(v) || '2FA kodu 6 haneli olmalıdır'
]

// Methods
const handleSubmit = () => {
  submit(async (values) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulate different scenarios
      if (values.email === 'admin@example.com') {
        // Simulate 2FA requirement
        if (!showTwoFactor.value) {
          showTwoFactor.value = true
          loginError.value = ''
          return
        }
      }
      
      if (values.email === 'error@example.com') {
        throw new Error('Geçersiz e-posta veya şifre')
      }
      
      console.log('Login successful:', { ...values, rememberMe: rememberMe.value })
    } catch (error: any) {
      loginError.value = error.message
      showTwoFactor.value = false
    }
  })
}

const resetForm = () => {
  reset()
  showTwoFactor.value = false
  loginError.value = ''
}

const forgotPassword = () => {
  // Navigate to forgot password page
  console.log('Navigate to forgot password')
}

const goToRegister = () => {
  // Navigate to register page
  console.log('Navigate to register')
}
</script>

<style scoped>
.v-card-title {
  background: linear-gradient(135deg, #42b883, #369870);
  color: white;
}

.v-btn {
  text-transform: none;
}
</style>

