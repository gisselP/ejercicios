<script setup>
import { ref,onMounted } from 'vue'
import Gtext from '@/components/Gtext.vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

import TimeAgo from 'javascript-time-ago'
import es from 'javascript-time-ago/locale/es.json'

TimeAgo.addLocale(es)

TimeAgo.setDefaultLocale('es')

const timeAgo = new TimeAgo()
const comentarioUsuario= ref({
  comentario:''
})
const publicaciones=ref([])

const props = defineProps({
  publicaciones: { 
    type: Array,
    default: () => [], 
  },
})


onMounted(() => {
  publicaciones.value = JSON.parse(localStorage.getItem('publicaciones'));
})

const agregarComentario = (id) =>{
  console.log(id)
  const publicacion = publicaciones.value.find((item)=>item.id=== id)
  // localStorage.setItem('publicaciones',JSON.stringify(publicaciones.value))
  publicacion.comentarios.push(comentarioUsuario.value)
  console.log(publicacion)
  publicaciones.value.map((item)=>console.log(item.comentarios,34))
}
</script>
<template>
  <section  class="flex flex-col gap-4 mt-10">
    <div class="relative">
      <input type="search" name="" class="search" placeholder="¡Hola, Camila! ¿qué publicación o perfil estás buscando?">
      <img src="../assets/buscar.svg" class="absolute pl-4 bg-white top-3 right-5">
    </div>
    <section v-for="({usuario,mensaje,id},index) of props.publicaciones" :key="index" >
      <section  class="p-4 bg-white rounded-xl">
        <header class="avatar">
            <div class="mx-auto ">
                <img src="../assets/profile.png" alt="" class="rounded-full h-9">
            </div>
            <div class="grid grid-rows-2 justify-items-start items center">
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
          <div class="relative">
            <Gtext
              v-model="comentarioUsuario.comentario"
              type="text"
              placeholder="Escribe un comentario"
              class=""
            />
            <button type="submit" @click="agregarComentario(id)" class="absolute top-0 right-0 p-2 rounded-r-xl bg-neutral-100" ><img src="../assets/enviar.svg" alt="" class="h-4"></button>
          </div>
  
        </section>
        <section  v-for="i in 1" :key="i" class="mt-4 avatar">
          <div class="mx-auto ">
              <img src="../assets/profile.png" alt="" class="rounded-full h-9">
          </div>
          <p class="p-2 px-3 text-sm font-semibold text-black">{{comentarioUsuario.comentario}}</p>
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
  @apply items-center justify-center gap-2;
}
.reacciones{
  @apply grid grid-cols-2 py-1 text-sm border-y-2;
}
.reacciones > p{
  @apply flex items-center justify-center gap-2 py-1 font-bold rounded-md cursor-pointer hover:bg-neutral-100;
}

</style>


