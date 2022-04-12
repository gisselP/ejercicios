<script setup>
import {ref,onMounted,computed,reactive} from 'vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import Gtextarea from '@/components/Gtextarea.vue'
import Gtext from '@/components/Gtext.vue'


const emit = defineEmits(['publicaciones'])
const publicaciones = ref([])
const publicacion = ref({
  usuario:'',
  mensaje:'',
  comentarios:[],
  id:'',
  likes:[]
})

const rules = computed(() => {
  return {
    publicacion: {
      usuario: { required },
      mensaje: { required },
    }
  }
})

const v$ = useVuelidate(rules, {publicacion} )

const usuarioError = computed(() => {
  let error = []
  if (!v$.value.publicacion.usuario.$dirty) return error
  v$.value.publicacion.usuario.required.$invalid && error.push('¡Olvidaste llenar este campo!')
  return error
})
const mensajeError = computed(() => {
  let error = []
  if (!v$.value.publicacion.mensaje.$dirty) return error
  v$.value.publicacion.mensaje.required.$invalid && error.push('¡Olvidaste llenar este campo!')
  return error
})

const agregarMensaje = () =>{
  publicaciones.value = JSON.parse(localStorage.getItem('publicaciones'));
  
  publicacion.value.id = publicaciones.value.length
  publicaciones.value.unshift({
    usuario: publicacion.value.usuario,
    mensaje: publicacion.value.mensaje,
    comentarios: publicacion.value.comentarios,
    id:publicacion.value.id,
    likes: publicacion.value.likes
  })
  emit('publicaciones')

  localStorage.setItem('publicaciones',JSON.stringify(publicaciones.value))
  publicacion.value={
     usuario:'',
     mensaje:'',
     comentarios:[],
     id:null,
     likes:[]
  }
  v$.value.$reset()
}

const validate = () =>{
  try {
    v$.value.$touch()
    if (v$.value.$invalid) {
      alert('Te faltó rellenar este campo')
    } else {
      agregarMensaje()
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  publicaciones.value = JSON.parse(localStorage.getItem('publicaciones'));
})

</script>
<template>
  <section  class="flex flex-col h-full gap-2 mt-10 ">
    <form class="p-4 text-sm font-semibold bg-white rounded-2xl " @submit.prevent="validate">
      <h1 class="pb-4 text-lg font-bold">Mensaje para los colaboradores</h1>
      <p class="mb-2">Usuario</p>
      <Gtext
        v-model="publicacion.usuario"
        type="text"
        placeholder="Escribe aquí"
        :error-messages="usuarioError"
        @input="v$.publicacion.usuario.$touch()"
      />
      <p class="my-2">Añadir descripción</p>
      <Gtextarea
        v-model="publicacion.mensaje"
        placeholder="Publica aquí"
        :error-messages="mensajeError"
        @input="v$.publicacion.mensaje.$touch()"
      />
      <div class="grid grid-cols-2">      
        <button class="col-start-2 py-4 mt-2 text-sm font-medium text-white rounded-2xl " type="submit"> Publicar</button>
      </div>
    </form>

  </section>
</template>
<style lang="postcss" scoped>
section{
  @apply text-black;
}

button{
    background: #F47647;
}
</style>


