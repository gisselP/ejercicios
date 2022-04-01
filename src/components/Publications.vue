<script setup>
import Post from '@/components/Post.vue'


</script>
<template>
  <section  class="flex flex-col gap-4 mt-10">
    <div class="relative">
      <input type="search" name="" class="search" placeholder="¡Hola, Camila! ¿qué publicación o perfil estás buscando?">
      <img src="../assets/buscar.svg" class="absolute pl-4 bg-white top-3 right-5">
    </div>
    <Post  />
  </section>
  
</template>
<style lang="postcss" scoped>
.search{
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  @apply w-full h-12 px-5 text-sm font-bold rounded-md shadow-xl outline-none mb-4;
}
</style>


