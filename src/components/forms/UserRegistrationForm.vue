<template>
  <v-card class="mx-auto" max-width="800">
    <v-card-title class="text-h5 text-center pa-6">
      <v-icon class="mr-2">mdi-account-plus</v-icon>
      Kullanıcı Kayıt Formu
    </v-card-title>

    <v-card-subtitle class="text-center pb-4">
      Hesap oluşturmak için aşağıdaki bilgileri doldurun
    </v-card-subtitle>

    <v-card-text>
      <v-form @submit.prevent="handleSubmit">
        <v-row>
          <!-- Kişisel Bilgiler -->
          <v-col cols="12">
            <v-divider class="mb-4"></v-divider>
            <h3 class="text-h6 mb-4">
              <v-icon class="mr-2">mdi-account</v-icon>
              Kişisel Bilgiler
            </h3>
          </v-col>

          <v-col cols="12" md="6">
            <BaseFormField
              name="firstName"
              label="Ad"
              type="text"
              :required="true"
              placeholder="Adınızı giriniz"
              :rules="firstNameRules"
            />
          </v-col>

          <v-col cols="12" md="6">
            <BaseFormField
              name="lastName"
              label="Soyad"
              type="text"
              :required="true"
              placeholder="Soyadınızı giriniz"
              :rules="lastNameRules"
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
              label="Telefon"
              type="tel"
              :required="true"
              placeholder="+90 555 123 45 67"
              prepend-icon="mdi-phone"
              :rules="phoneRules"
            />
          </v-col>

          <v-col cols="12" md="6">
            <BaseFormField
              name="dateOfBirth"
              label="Doğum Tarihi"
              type="date"
              :required="true"
              :rules="dateOfBirthRules"
            />
          </v-col>

          <v-col cols="12" md="6">
            <BaseFormField
              name="gender"
              label="Cinsiyet"
              type="radio"
              :required="true"
              :options="genderOptions"
              :rules="genderRules"
            />
          </v-col>

          <!-- Adres Bilgileri -->
          <v-col cols="12">
            <v-divider class="mb-4 mt-4"></v-divider>
            <h3 class="text-h6 mb-4">
              <v-icon class="mr-2">mdi-map-marker</v-icon>
              Adres Bilgileri
            </h3>
          </v-col>

          <v-col cols="12" md="6">
            <BaseFormField
              name="country"
              label="Ülke"
              type="select"
              :required="true"
              :options="countryOptions"
              :rules="countryRules"
            />
          </v-col>

          <v-col cols="12" md="6">
            <BaseFormField
              name="city"
              label="Şehir"
              type="text"
              :required="true"
              placeholder="Şehrinizi giriniz"
              :rules="cityRules"
            />
          </v-col>

          <v-col cols="12">
            <BaseFormField
              name="address"
              label="Adres"
              type="textarea"
              :required="true"
              placeholder="Tam adresinizi giriniz"
              :rules="addressRules"
            />
          </v-col>

          <v-col cols="12" md="6">
            <BaseFormField
              name="zipCode"
              label="Posta Kodu"
              type="text"
              :required="true"
              placeholder="12345"
              :rules="zipCodeRules"
            />
          </v-col>

          <!-- Ek Bilgiler -->
          <v-col cols="12">
            <v-divider class="mb-4 mt-4"></v-divider>
            <h3 class="text-h6 mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              Ek Bilgiler
            </h3>
          </v-col>

          <v-col cols="12">
            <BaseFormField
              name="bio"
              label="Biyografi"
              type="textarea"
              placeholder="Kendiniz hakkında kısa bir açıklama yazın..."
              :rules="bioRules"
            />
          </v-col>

          <v-col cols="12">
            <v-label class="text-subtitle-2 mb-2">İlgi Alanları</v-label>
            <v-chip-group
              v-model="selectedInterests"
              multiple
              column
            >
              <v-chip
                v-for="interest in interestOptions"
                :key="interest.value"
                :value="interest.value"
                filter
                variant="outlined"
              >
                {{ interest.label }}
              </v-chip>
            </v-chip-group>
            <v-messages
              v-if="interestsError"
              :messages="[interestsError]"
              color="error"
              class="mt-1"
            />
          </v-col>

          <!-- Tercihler -->
          <v-col cols="12">
            <v-divider class="mb-4 mt-4"></v-divider>
            <h3 class="text-h6 mb-4">
              <v-icon class="mr-2">mdi-cog</v-icon>
              Tercihler
            </h3>
          </v-col>

          <v-col cols="12">
            <BaseFormField
              name="newsletter"
              label="E-posta bültenine abone olmak istiyorum"
              type="checkbox"
            />
          </v-col>

          <v-col cols="12">
            <BaseFormField
              name="terms"
              label="Kullanım şartlarını ve gizlilik politikasını kabul ediyorum"
              type="checkbox"
              :required="true"
              :rules="termsRules"
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
            <v-icon class="mr-2">mdi-check</v-icon>
            Kayıt Ol
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
        Kayıt işlemi başarıyla tamamlandı!
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFormValidation, userFormSchema } from '../../composables/useFormValidation'
import type { UserForm } from '../../types/Form'
import BaseFormField from './BaseFormField.vue'

// Form initial values
const initialValues: UserForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  gender: 'male',
  country: '',
  city: '',
  address: '',
  zipCode: '',
  bio: '',
  interests: [],
  newsletter: false,
  terms: false
}

// Form validation
const { errors, meta, isSubmitting, submitSuccess, isFormValid, submit, reset } = useFormValidation(
  userFormSchema,
  initialValues
)

// Interest selection
const selectedInterests = ref<string[]>([])
const interestsError = computed(() => {
  if (selectedInterests.value.length === 0 && meta.value.touched) {
    return 'En az bir ilgi alanı seçiniz'
  }
  return null
})

// Options
const genderOptions = [
  { value: 'male', label: 'Erkek' },
  { value: 'female', label: 'Kadın' },
  { value: 'other', label: 'Diğer' }
]

const countryOptions = [
  { value: 'tr', label: 'Türkiye' },
  { value: 'us', label: 'Amerika Birleşik Devletleri' },
  { value: 'de', label: 'Almanya' },
  { value: 'fr', label: 'Fransa' },
  { value: 'gb', label: 'İngiltere' }
]

const interestOptions = [
  { value: 'technology', label: 'Teknoloji' },
  { value: 'sports', label: 'Spor' },
  { value: 'music', label: 'Müzik' },
  { value: 'art', label: 'Sanat' },
  { value: 'travel', label: 'Seyahat' },
  { value: 'cooking', label: 'Yemek Yapma' },
  { value: 'reading', label: 'Okuma' },
  { value: 'gaming', label: 'Oyun' }
]

// Validation rules
const firstNameRules = [(v: string) => !!v || 'Ad alanı zorunludur']
const lastNameRules = [(v: string) => !!v || 'Soyad alanı zorunludur']
const emailRules = [
  (v: string) => !!v || 'E-posta alanı zorunludur',
  (v: string) => /.+@.+\..+/.test(v) || 'Geçerli bir e-posta adresi giriniz'
]
const phoneRules = [
  (v: string) => !!v || 'Telefon alanı zorunludur',
  (v: string) => /^[0-9+\-\s()]+$/.test(v) || 'Geçerli bir telefon numarası giriniz'
]
const dateOfBirthRules = [(v: string) => !!v || 'Doğum tarihi zorunludur']
const genderRules = [(v: string) => !!v || 'Cinsiyet seçimi zorunludur']
const countryRules = [(v: string) => !!v || 'Ülke seçimi zorunludur']
const cityRules = [(v: string) => !!v || 'Şehir alanı zorunludur']
const addressRules = [(v: string) => !!v || 'Adres alanı zorunludur']
const zipCodeRules = [
  (v: string) => !!v || 'Posta kodu zorunludur',
  (v: string) => /^[0-9]{5}$/.test(v) || 'Posta kodu 5 haneli olmalıdır'
]
const bioRules = [(v: string) => !v || v.length <= 500 || 'Biyografi en fazla 500 karakter olabilir']
const termsRules = [(v: boolean) => !!v || 'Kullanım şartlarını kabul etmelisiniz']

// Methods
const handleSubmit = () => {
  submit(async (values) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('Form submitted:', { ...values, interests: selectedInterests.value })
  })
}

const resetForm = () => {
  reset()
  selectedInterests.value = []
}
</script>

<style scoped>
.v-card-title {
  background: linear-gradient(135deg, #42b883, #369870);
  color: white;
}

.v-divider {
  border-color: #42b883;
}

.v-chip-group {
  margin-top: 8px;
}

.v-chip--selected {
  background-color: #42b883 !important;
  color: white !important;
}
</style>
