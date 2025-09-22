<template>
  <div class="debug-form">
    <h2>Debug Form - Vuetify Test</h2>
    
    <!-- Test 1: Basit HTML Input -->
    <div class="mb-4">
      <h3>Test 1: Basit HTML Input</h3>
      <input 
        v-model="testData.htmlInput" 
        placeholder="HTML Input Test"
        class="form-control"
      />
      <p>Değer: {{ testData.htmlInput }}</p>
    </div>

    <!-- Test 2: Vuetify Text Field -->
    <div class="mb-4">
      <h3>Test 2: Vuetify Text Field</h3>
      <v-text-field
        v-model="testData.vuetifyInput"
        label="Vuetify Input"
        placeholder="Vuetify Input Test"
        variant="outlined"
      />
      <p>Değer: {{ testData.vuetifyInput }}</p>
    </div>

    <!-- Test 3: Vuetify Button -->
    <div class="mb-4">
      <h3>Test 3: Vuetify Button</h3>
      <v-btn 
        color="primary" 
        @click="testClick"
      >
        Test Button
      </v-btn>
      <p>Button tıklandı: {{ buttonClicked }}</p>
    </div>

    <!-- Test 4: Vuetify Card -->
    <div class="mb-4">
      <h3>Test 4: Vuetify Card</h3>
      <v-card class="pa-4">
        <v-card-title>Test Card</v-card-title>
        <v-card-text>
          Bu bir Vuetify card bileşenidir.
        </v-card-text>
      </v-card>
    </div>

    <!-- Test 5: Vuetify Form -->
    <div class="mb-4">
      <h3>Test 5: Vuetify Form</h3>
      <v-form @submit.prevent="handleSubmit">
        <v-text-field
          v-model="testData.formInput"
          label="Form Input"
          :rules="[v => !!v || 'Bu alan zorunludur']"
          variant="outlined"
          class="mb-3"
        />
        <v-btn type="submit" color="primary">
          Form Submit
        </v-btn>
      </v-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const testData = ref({
  htmlInput: '',
  vuetifyInput: '',
  formInput: ''
})

const buttonClicked = ref(false)

const testClick = () => {
  buttonClicked.value = true
  console.log('Button clicked!')
}

const handleSubmit = () => {
  console.log('Form submitted:', testData.value)
  alert('Form submitted!')
}
</script>

<style scoped>
.debug-form {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.mb-4 {
  margin-bottom: 1.5rem;
}

h3 {
  color: #42b883;
  margin-bottom: 0.5rem;
}
</style>

