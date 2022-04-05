<script setup>
import {ref,onMounted,reactive,computed} from 'vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const props = defineProps({
  mensaje:[String, Number],
  type:{
    type: String,
    default: 'text',
  },
  isRequired: Boolean,
  errorMessages: {
    type: Array,
    default: () => [],
  },
  placeholder:{
    type: String,
    default: '',
  }
})

const rules = {
  internalValue: { required },
}

const internalValue = computed({
  get: () => props.mensaje,
  set: (value) => emit('update:mensaje', value),
})

const v$ = useVuelidate(rules, { internalValue })
const emit = defineEmits(['update:mensaje'])

const getErrorMessage = computed(() =>
 props.errorMessages.length > 0 ? props.errorMessages[0] : ''
)

</script>
<template>
  <section>
    <input
      v-model="internalValue" 
      :type="text" 
      :required="isRequired"
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
  @apply w-full px-4 py-2 my-2 text-sm font-light bg-neutral-100 rounded-xl;
}
.textfield::placeholder {
  @apply text-sm font-light;
}
.error{
  @apply text-orange-500;
}
.textfield-error{
  @apply border-orange-500 border-2;
}
</style>