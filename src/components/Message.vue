<script setup>
import {ref,onMounted,reactive,computed} from 'vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const emit = defineEmits(['enviar-item'])
const publicaciones = ref([])
const publicacion = ref({
  usuario:'',
  mensaje:'',

})
const errors =ref('')
/* const rules = computed(() => {
  return {
    publicacion: {
      usuario: { required },
      mensaje: { required },
    }
  }
})


const usuarioError = computed(() => {
  let error = []
  if (!v$.value.publicacion.usuario.$dirty) return error
  v$.value.publicacion.usuario.required.$invalid && error.push('¡Te olvidaste de llenar este campo obligatorio!')
  errors.value=error
  return errors
})

const v$ = useVuelidate(rules, publicacion.value )
 */

const agregarMensaje = () =>{
  if(!publicacion.value.usuario||!publicacion.value.mensaje){
   alert('¡Te olvidaste de llenar este campo obligatorio!')
  }
  publicaciones.value.push(publicacion.value)
  emit('enviar-item',publicaciones.value)
  localStorage.setItem('publicaciones',JSON.stringify(publicaciones.value))
  publicacion.value={
     usuario:'',
     mensaje:''
  }
}
onMounted(() => {
  publicaciones.value = JSON.parse(localStorage.getItem('publicaciones'));

})
</script>

<template>
  <section  class="flex flex-col gap-2 mt-10 ">
    <div class="p-4 text-sm font-medium bg-white rounded-2xl font-poppins">
      <h1 class="pb-4 text-lg font-bold">Mensaje para los colaboradores</h1>
      <p>Usuario</p>
      <input v-model="publicacion.usuario" required type="text" placeholder ="Escribe aquí" class="w-full px-4 py-2 my-2 text-sm font-bold bg-neutral-100 rounded-xl">
 
      <p class="mt-2">Añadir descripción</p>
      <textarea v-model="publicacion.mensaje" required class="textarea" placeholder="Publica aquí"></textarea>
      <div class="grid grid-cols-2">      
        <button class="col-start-2 py-4 mt-2 text-sm font-medium text-white rounded-2xl " type="submit" @click="agregarMensaje"> Publicar</button>
      </div>
    </div>

  </section>
</template>
<style lang="postcss" scoped>
section{
  @apply text-black;
}
.textarea{
  @apply outline-0 text-sm border-0 my-2 bg-neutral-100 rounded-md resize-none font-bold px-4 py-2 h-32 w-full;
}
button{
    background: #F47647;
}
</style>


