<script setup>
import { computed } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const props = defineProps({
  modelValue: [String, Number, Object],
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
    <textarea
      v-model="internalValue" 
      :placeholder ="placeholder" 
      class="textarea"
      :class="{
        'textarea-error': getErrorMessage,
      }"
    ></textarea>
    <p v-if="getErrorMessage" class="error"  >
      {{getErrorMessage}}
    </p>
  </section>
</template>
<style  lang="postcss" scoped>
.textarea{
  outline: none;
  @apply outline-0 text-sm border-0 bg-neutral-100 rounded-xl resize-none font-bold px-4 py-2 h-32 w-full;
}
.textarea::placeholder {
  @apply text-sm font-light;
}
.error{
  @apply text-red-700 text-xs;
}
.textarea-error{
  @apply border-red-700 border-2;
}
</style>