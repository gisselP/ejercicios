<script setup>
import { computed } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const props = defineProps({
  modelValue: [String, Number, Object],
  id: [String, Number],
  type:{
    type: String,
    default: 'text',
  },
  errorMessages: {
    type: Array,
    default: () => [],
  },
  placeholder:{
    type: String,
    default: '',
  }
})
const emit = defineEmits(['update:modelValue'])

const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})



const getErrorMessage = computed(() =>
 props.errorMessages.length > 0 ? props.errorMessages[0] : ''
)

</script>
<template>
  <section>
    <input
      v-model="internalValue" 
      :type="type" 
      :id="id"
      :placeholder ="placeholder" 
      class="textfield"
      :class="{
        'textfield-error': getErrorMessage,
      }"
    >
    <p v-if="getErrorMessage" class="error"  >
      {{getErrorMessage}}
    </p>
  </section>
</template>
<style  lang="postcss" scoped>
.textfield{
  outline: none;
  @apply w-full px-4 py-2 text-sm font-medium bg-neutral-100 rounded-xl;
}
.textfield::placeholder {
  @apply text-sm font-medium;
}
.error{
  @apply text-red-700	text-xs font-medium;
}
.textfield-error{
  @apply border-red-700 border-2;
}
</style>