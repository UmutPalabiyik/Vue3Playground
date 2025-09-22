<template>
  <v-text-field
    v-if="type === 'text' || type === 'email' || type === 'password' || type === 'tel'"
    v-model="fieldValue"
    :label="label"
    :placeholder="placeholder"
    :type="type"
    :required="required"
    :error-messages="errorMessage"
    :disabled="disabled"
    :prepend-inner-icon="prependIcon"
    :append-inner-icon="appendIcon"
    :rules="validationRules"
    variant="outlined"
    density="comfortable"
    class="mb-3"
    @blur="handleBlur"
    @input="handleInput"
  />

  <v-textarea
    v-else-if="type === 'textarea'"
    v-model="fieldValue"
    :label="label"
    :placeholder="placeholder"
    :required="required"
    :error-messages="errorMessage"
    :disabled="disabled"
    :rules="validationRules"
    variant="outlined"
    density="comfortable"
    rows="4"
    class="mb-3"
    @blur="handleBlur"
    @input="handleInput"
  />

  <v-select
    v-else-if="type === 'select'"
    v-model="fieldValue"
    :label="label"
    :placeholder="placeholder"
    :required="required"
    :error-messages="errorMessage"
    :disabled="disabled"
    :items="options"
    :rules="validationRules"
    variant="outlined"
    density="comfortable"
    class="mb-3"
    @blur="handleBlur"
    @update:model-value="handleInput"
  />

  <v-radio-group
    v-else-if="type === 'radio'"
    v-model="fieldValue"
    :label="label"
    :required="required"
    :error-messages="errorMessage"
    :disabled="disabled"
    :rules="validationRules"
    inline
    class="mb-3"
    @blur="handleBlur"
    @update:model-value="handleInput"
  >
    <v-radio
      v-for="option in options"
      :key="option.value"
      :label="option.label"
      :value="option.value"
    />
  </v-radio-group>

  <v-checkbox
    v-else-if="type === 'checkbox'"
    v-model="fieldValue"
    :label="label"
    :required="required"
    :error-messages="errorMessage"
    :disabled="disabled"
    :rules="validationRules"
    class="mb-3"
    @blur="handleBlur"
    @update:model-value="handleInput"
  />

  <v-text-field
    v-else-if="type === 'date'"
    v-model="fieldValue"
    :label="label"
    :placeholder="placeholder"
    :required="required"
    :error-messages="errorMessage"
    :disabled="disabled"
    :rules="validationRules"
    type="date"
    variant="outlined"
    density="comfortable"
    class="mb-3"
    @blur="handleBlur"
    @input="handleInput"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'tel' | 'date' | 'select' | 'textarea' | 'checkbox' | 'radio'
  required?: boolean
  placeholder?: string
  disabled?: boolean
  prependIcon?: string
  appendIcon?: string
  options?: { value: string; label: string }[]
  rules?: any
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: any]
  'blur': []
  'input': [value: any]
}>()

// Simple reactive value for now
const fieldValue = ref('')
const errorMessage = ref('')

// Validation rules
const validationRules = computed(() => {
  const rules = []
  if (props.required) {
    rules.push((v: any) => !!v || `${props.label} alanı zorunludur`)
  }
  if (props.rules) {
    rules.push(props.rules)
  }
  return rules
})

const handleBlur = () => {
  emit('blur')
}

const handleInput = (value: any) => {
  fieldValue.value = value
  emit('update:modelValue', value)
  emit('input', value)
}
</script>

<style scoped>
.v-field--error {
  --v-field-border-color: #d32f2f;
}

.v-messages--error {
  color: #d32f2f;
}
</style>