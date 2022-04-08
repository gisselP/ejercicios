<script setup>
import { ref,onMounted,watch,computed } from 'vue'
import Gtext from '@/components/Gtext.vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import Comentario from '@/components/Comentario.vue'
import TimeAgo from 'javascript-time-ago'
import es from 'javascript-time-ago/locale/es.json'

TimeAgo.addLocale(es)

TimeAgo.setDefaultLocale('es')

const timeAgo = new TimeAgo()

const publicaciones = ref([])
const comentarioUsuario = ref('')
const actualizar = ref(false)

const props = defineProps({
  actualizarPublicacion: { 
    type: Boolean,
    default: false, 
  },
})

const listarPublicaciones = (item) =>{
   actualizar.value = true
  setTimeout(() => {
    actualizar.value = false
    publicaciones.value = JSON.parse(localStorage.getItem('publicaciones'))
  },500);
  console.log(item)
}

watch(
  () => props.actualizarPublicacion,
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
        <Comentario
          @enviar-item="listarPublicaciones"
          :actualizarComentario="actualizar"
          :id="id"
        />

        <section  v-for="({ comentario },index) in comentarios" :key="index" class="py-3 border-t-2 avatar">
          <div class="pt-1 mx-auto">
              <img src="../assets/profile.png" alt="" class="rounded-full h-9">
          </div>
          <div class="flex flex-col pr-2 ">
            <div>
              <h1 class="inline-block text-sm font-semibold text-black capitalize">{{usuario}}</h1>
              <span class="ml-4 text-xs font-semibold ">{{ timeAgo.format(Date.now() - 60 * 1000)}}</span>
            </div>  
            <p class="text-sm font-medium text-black ">{{comentario}}</p>
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

</style>


