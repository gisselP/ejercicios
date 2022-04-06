<script setup>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import Publications from '@/components/Publications.vue'
import Message from '@/components/Message.vue'
import Footer from '@/components/Footer.vue'
import { ref,onMounted } from 'vue'

const publicaciones=ref([])

const variableRecibida = (item) => {
  publicaciones.value = item
}

onMounted(() => {
  publicaciones.value = JSON.parse(localStorage.getItem('publicaciones'));
})


</script>
<template>
  <Navbar />
  <main class="home">
    <Sidebar  class="hidden lg:block lg:col-span-2"/>
    <Publications  :publicaciones="publicaciones" class="md:col-span-6 lg:col-span-5"/>
    <Message @enviar-item="variableRecibida" class="hidden md:block md:col-span-4 lg:col-span-3"/>
  </main>
  <Footer />
</template>
<style lang="postcss" scoped>
.home{
  margin-top:70px;
  @apply grid md:grid-cols-10 h-full gap-10 mx-14 md:mx-10 ;
}
</style>

