<script setup>
import { ref,onMounted,watch,computed } from 'vue'
import Gtext from '@/components/Gtext.vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

import TimeAgo from 'javascript-time-ago'
import es from 'javascript-time-ago/locale/es.json'

TimeAgo.addLocale(es)

TimeAgo.setDefaultLocale('es')

const timeAgo = new TimeAgo()

const publicaciones = ref([])
const comentarioUsuario = ref('')

const props = defineProps({
  actualizar: { 
    type: Boolean,
    default: false, 
  },
})

const rules = computed(() => {
  return {
    comentarioUsuario: { required }
  }
})

const v$ = useVuelidate(rules, { comentarioUsuario } )


const listarPublicaciones = () =>{
  publicaciones.value = JSON.parse(localStorage.getItem('publicaciones'))
}

const agregarComentario = (id) =>{
  const { comentarios } = publicaciones.value.find((item)=>item.id=== id)
  comentarios.unshift({ comentario : comentarioUsuario.value })
  localStorage.setItem('publicaciones',JSON.stringify(publicaciones.value))
  
  comentarioUsuario.value =''
  v$.value.$reset()
}

const validate = (evento,id) =>{
  try {
    if (evento.code != 'Enter') return
    v$.value.$touch()
    if (v$.value.$invalid) {
      alert('¿Ey no querías publicar?')
    } else {
      agregarComentario(id)
    }
  } catch (error) {
    console.log(error)
  }
}


watch(
  () => props.actualizar,
  (val) => {
    if(val){
      listarPublicaciones()
    }
  }
)

onMounted(() => {
  listarPublicaciones()
})
</script>
<template>
  <section  class="flex flex-col gap-4 my-10 mb-20">
    <div class="relative">
      <input type="search" name="" class="search" placeholder="¡Hola, Camila! ¿qué publicación o perfil estás buscando?">
      <img src="../assets/buscar.svg" class="absolute pl-4 bg-white top-3 right-5">
    </div>
    <section v-for="({ usuario,mensaje,id,comentarios },index) of publicaciones" :key="index" >
      <section  class="p-4 bg-white rounded-xl">
        <header class="avatar">
            <div class="mx-auto ">
                <img src="../assets/profile.png" alt="" class="rounded-full h-9">
            </div>
            <div class="grid items-center grid-rows-2 justify-items-start">
                <h1 class="text-sm font-bold text-black capitalize">{{usuario}}</h1>
                <p class="text-xs font-bold">{{ timeAgo.format(Date.now() - 60 * 1000)}}</p>
            </div>
        </header>
        <p class="py-3 text-sm font-medium text-black">{{mensaje}}</p>
        <section class="reacciones">
          <p>
            <img src="../assets/like.svg" alt="" class="h-5" >
            Me gusta
          </p>
          <p >
            <img src="../assets/message.svg" alt="" class="h-5">
            <label >Comentar</label>
          </p>
        </section>
        <section class="mt-4 avatar">
          <div class="mx-auto ">
              <img src="../assets/profile.png" alt="" class="rounded-full h-9">
          </div>
          <form class="relative" @keyup="validate({ code: $event.key },id)" >
            <Gtext
              v-model="comentarioUsuario"
              type="text"
              placeholder="Escribe un comentario"
              @input="v$.comentarioUsuario.$touch()"
            />
            <button type="submit" class="btn" @click="validate({ code: 'Enter' },id)" ><img src="../assets/enviar.svg" alt="" class="h-4"></button>
          </form>
  
        </section>
        <section  v-for="({ comentario },index) in comentarios" :key="index" class="mt-4 avatar">
          <div class="pt-1 mx-auto">
              <img src="../assets/profile.png" alt="" class="rounded-full h-9">
          </div>
          <div class="flex flex-col pr-2 ">
            <div>
              <h1 class="inline-block text-sm font-semibold text-black capitalize">{{usuario}}</h1>
              <span class="ml-4 text-xs font-semibold ">{{ timeAgo.format(Date.now() - 60 * 1000)}}</span>
            </div>  
            <p class="text-sm font-semibold text-black ">{{comentario}}</p>
          </div>
        </section>
      </section>
    </section>
  </section>
  
</template>
<style lang="postcss" scoped>
.search{
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  @apply w-full h-12 px-5 text-sm font-bold rounded-md shadow-xl outline-none mb-4;
}
.avatar{
  display: grid;
  grid-template-columns: 40px 1fr;
  @apply  justify-center gap-2;
}
.reacciones{
  @apply grid grid-cols-2 py-1 text-sm border-y-2;
}
.reacciones > p{
  @apply flex items-center justify-center gap-2 py-1 font-bold rounded-md cursor-pointer hover:bg-neutral-100;
}
.btn{
  top:2.2px;
  @apply absolute right-1 p-2 rounded-r-xl bg-neutral-100;
}
</style>


