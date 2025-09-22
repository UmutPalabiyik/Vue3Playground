<template>
  <div class="forms-page">
    <div class="page-header">
      <h1>Form Örnekleri</h1>
      <p>Vue.js ile modern form yapıları ve validasyon örnekleri</p>
    </div>

    <v-container fluid>
      <v-row>
        <!-- Form Seçimi -->
        <v-col cols="12" md="3">
          <v-card class="form-selector">
            <v-card-title>
              <v-icon class="mr-2">mdi-form-select</v-icon>
              Form Türü
            </v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item
                  v-for="form in availableForms"
                  :key="form.id"
                  :active="selectedForm === form.id"
                  @click="selectedForm = form.id"
                  class="form-list-item"
                >
                  <template v-slot:prepend>
                    <v-icon :color="selectedForm === form.id ? 'primary' : 'grey'">
                      {{ form.icon }}
                    </v-icon>
                  </template>
                  <v-list-item-title>{{ form.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{ form.description }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>

          <!-- Form Bilgileri -->
          <v-card class="mt-4 form-info">
            <v-card-title>
              <v-icon class="mr-2">mdi-information</v-icon>
              Form Bilgileri
            </v-card-title>
            <v-card-text>
              <div v-if="currentFormInfo">
                <v-chip
                  v-for="feature in currentFormInfo.features"
                  :key="feature"
                  class="ma-1"
                  size="small"
                  color="primary"
                  variant="outlined"
                >
                  {{ feature }}
                </v-chip>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Form İçeriği -->
        <v-col cols="12" md="9">
          <v-card class="form-container">
            <v-card-text>
              <!-- Debug Formu -->
              <DebugForm v-if="selectedForm === 'debug'" />

              <!-- Test Formu -->
              <SimpleTestForm v-else-if="selectedForm === 'test'" />

              <!-- Kullanıcı Kayıt Formu -->
              <UserRegistrationForm v-else-if="selectedForm === 'user'" />

              <!-- İletişim Formu -->
              <ContactForm v-else-if="selectedForm === 'contact'" />

              <!-- Giriş Formu -->
              <LoginForm v-else-if="selectedForm === 'login'" />

              <!-- Form Seçimi Yapılmamış -->
              <div v-else class="text-center pa-8">
                <v-icon size="64" color="grey">mdi-form-select</v-icon>
                <h3 class="text-h6 mt-4 mb-2">Form Seçin</h3>
                <p class="text-grey">Sol taraftan bir form türü seçerek başlayın</p>
              </div>
            </v-card-text>
          </v-card>

          <!-- Form Özellikleri -->
          <v-card class="mt-4 form-features">
            <v-card-title>
              <v-icon class="mr-2">mdi-star</v-icon>
              Kullanılan Özellikler
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6">
                  <h4 class="text-subtitle-1 mb-2">UI Kütüphaneleri</h4>
                  <ul class="feature-list">
                    <li><strong>Vuetify 3:</strong> Material Design bileşenleri</li>
                    <li><strong>Vue 3:</strong> Composition API ve reaktivite</li>
                    <li><strong>TypeScript:</strong> Tip güvenliği</li>
                  </ul>
                </v-col>
                <v-col cols="12" md="6">
                  <h4 class="text-subtitle-1 mb-2">Validasyon</h4>
                  <ul class="feature-list">
                    <li><strong>VeeValidate 4:</strong> Form validasyonu</li>
                    <li><strong>Yup:</strong> Schema validasyonu</li>
                    <li><strong>Real-time:</strong> Anlık validasyon</li>
                  </ul>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import UserRegistrationForm from '../components/forms/UserRegistrationForm.vue'
import ContactForm from '../components/forms/ContactForm.vue'
import LoginForm from '../components/forms/LoginForm.vue'
import SimpleTestForm from '../components/forms/SimpleTestForm.vue'
import DebugForm from '../components/forms/DebugForm.vue'

const selectedForm = ref('')

const availableForms = [
  {
    id: 'debug',
    title: 'Debug Formu',
    description: 'Vuetify test formu',
    icon: 'mdi-bug'
  },
  {
    id: 'test',
    title: 'Test Formu',
    description: 'Basit test formu',
    icon: 'mdi-test-tube'
  },
  {
    id: 'user',
    title: 'Kullanıcı Kayıt',
    description: 'Kapsamlı kayıt formu',
    icon: 'mdi-account-plus'
  },
  {
    id: 'contact',
    title: 'İletişim',
    description: 'İletişim formu',
    icon: 'mdi-email'
  },
  {
    id: 'login',
    title: 'Giriş',
    description: 'Giriş formu',
    icon: 'mdi-login'
  }
]

const formInfo = {
  debug: {
    features: [
      'Vuetify Bileşen Testi',
      'HTML vs Vuetify Karşılaştırması',
      'Form Validasyon Testi',
      'Button ve Card Testi'
    ]
  },
  test: {
    features: [
      'Basit Input Alanları',
      'Temel Validasyon',
      'Vuetify Bileşenleri',
      'Form Submit'
    ]
  },
  user: {
    features: [
      'Kişisel Bilgiler',
      'Adres Bilgileri',
      'İlgi Alanları',
      'Checkbox Validasyonu',
      'Radio Button',
      'Textarea',
      'Date Picker'
    ]
  },
  contact: {
    features: [
      'Mesaj Gönderimi',
      'Kategori Seçimi',
      'Öncelik Belirleme',
      'Opsiyonel Alanlar',
      'Textarea Validasyonu'
    ]
  },
  login: {
    features: [
      'E-posta/Şifre',
      'Beni Hatırla',
      '2FA Desteği',
      'Hata Yönetimi',
      'Şifre Sıfırlama'
    ]
  }
}

const currentFormInfo = computed(() => {
  return selectedForm.value ? formInfo[selectedForm.value as keyof typeof formInfo] : null
})
</script>

<style scoped>
.forms-page {
  min-height: 100vh;
  background: #f8f9fa;
}

.page-header {
  background: linear-gradient(135deg, #42b883, #369870);
  color: white;
  padding: 3rem 0;
  text-align: center;
}

.page-header h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.page-header p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.form-selector {
  position: sticky;
  top: 2rem;
}

.form-list-item {
  border-radius: 8px;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
}

.form-list-item:hover {
  background: #f5f5f5;
}

.form-list-item.v-list-item--active {
  background: #e3f2fd;
  border-left: 4px solid #42b883;
}

.form-container {
  min-height: 600px;
}

.form-info {
  background: #f8f9fa;
}

.form-features {
  background: #f8f9fa;
}

.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.feature-list li:last-child {
  border-bottom: none;
}

.v-chip {
  margin: 0.25rem;
}
</style>
