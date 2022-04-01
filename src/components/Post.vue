<script setup>
import { ref,onMounted } from 'vue'

const publicaciones=ref([])

onMounted(() => {
  publicaciones.value = JSON.parse(localStorage.getItem('publicaciones'));
  console.log(publicaciones.value,7)
})

</script>
<template>
  <section v-for="({usuario,mensaje},index) of publicaciones" :key="index" >

    <section  class="p-4 bg-white rounded-xl">
      <header class="avatar">
          <div class="mx-auto ">
              <img src="../assets/profile.png" alt="" class="rounded-full h-9">
          </div>
          <div class="grid grid-rows-2 justify-items-start items center">
              <h1 class="text-sm font-bold text-black">{{usuario}}</h1>
              <p class="text-xs font-bold">• Hace 20 minutos</p>
          </div>
      </header>
      <p class="py-3 text-sm font-medium text-black">{{mensaje}}</p>
      <section class="reacciones">
        <p>
          <img src="../assets/like.svg" alt="" class="h-5" >
          Me gusta
        </p>
        <p>
          <img src="../assets/message.svg" alt="" class="h-5">
          Comentar
        </p>
      </section>
      <section class="mt-4 avatar">
        <div class="mx-auto ">
              <img src="../assets/profile.png" alt="" class="rounded-full h-9">
        </div>
        <input type="text" placeholder ="Escribe un comentario" class="p-2 px-3 text-sm font-bold bg-neutral-100 rounded-xl">
      </section>
    </section>
  </section>
 
</template>
<style lang="postcss" scoped>
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


