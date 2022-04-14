<script setup>
import { ref,onMounted,computed,reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import Gtextarea from '@/components/Gtextarea.vue'
import Gtext from '@/components/Gtext.vue'
import { useStore } from 'vuex'

const store = useStore()
const emit = defineEmits(['publicaciones'])

const usuario = ref('')
const publicaciones = ref([])
const publicacion = ref({
  usuario:'',
  mensaje:'',
  comentarios:[],
  id:'',
  likes:[]
})

/* store.state['user'].userLog ? store.state['user'].userLog : JSON.parse(localStorage.getItem('usuario'))
 */
const usuarioActual = computed(() => store.state['user'].userLog)
const usuarios = computed(() => store.state['user'].usuarios)

const findUsuario = () =>{
  if(!usuarioActual.value){
    const usuarioLocal = JSON.parse(localStorage.getItem('usuario'))
    const { displayName,id } = usuarios.value.find(item=> item.username === usuarioLocal)
    publicacion.value.usuario = displayName
    publicacion.value.id = id
  }else{
    const { displayName,id } = usuarios.value.find(item=> item.displayName === usuarioActual.value.displayName)
    publicacion.value.usuario = displayName
    publicacion.value.id = id
  }
}

const rules = computed(() => {
  return {
    publicacion: {
      mensaje: { required },
    }
  }
})

const v$ = useVuelidate(rules, {publicacion} )

const mensajeError = computed(() => {
  let error = []
  if (!v$.value.publicacion.mensaje.$dirty) return error
  v$.value.publicacion.mensaje.required.$invalid && error.push('¡Olvidaste llenar este campo!')
  return error
})

const agregarMensaje = () =>{

  store.commit('user/actualizarMensaje', publicacion.value)  
  publicaciones.value = JSON.parse(localStorage.getItem('publicaciones'))
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
  findUsuario()
  publicaciones.value = JSON.parse(localStorage.getItem('publicaciones'));
})

</script>
<template>
  <section  class="flex flex-col justify-end h-full gap-2 mt-10 md:justify-start ">
    <form class="p-4 text-sm font-semibold bg-white rounded-2xl " @submit.prevent="validate">
      <h1 class="pb-4 text-lg font-bold">Mensaje para los colaboradores</h1>
      <p class="mb-2">Usuario: <span >{{ publicacion.usuario|| 'Anónimo' }}</span></p>
      <!-- <Gtext
        v-model="publicacion.usuario"
        type="text"
        placeholder="Escribe aquí"
        :error-messages="usuarioError"
        @input="v$.publicacion.usuario.$touch()"
      /> -->
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


