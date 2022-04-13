<script setup>
import {ref,onMounted,computed,reactive} from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const usuario = ref('')

const usuarioActual = computed(() => store.state['user'].userLog)
const usuarios = computed(() => store.state['user'].usuarios)

const findUsuario = () =>{
  const { displayName } = usuarios.value.find(item=> item.displayName === usuarioActual.value.displayName)
  usuario.value = displayName
  console.log(usuario.value)
}

onMounted(() => {
  findUsuario()
})
</script>
<template>
  <header class="header">
    <div class="flex justify-center gap-5" @click="nombre">
      <img src="../assets/logo.svg" alt="" class="h-8">
    </div>
    <div class="flex flex-row items-center gap-10">  
      <img src="../assets/carta.svg">
      <img src="../assets/campana.svg">
      <img  class="w-14 md:hidden" src="../assets/sae.svg">
      <h1 class="hidden text-lg font-bold text-white md:flex md:items-center md:gap-4">
        {{usuario}}
        <img src="../assets/profile.png" alt="" class="rounded-full h-9">
      </h1>
    </div>
  </header>
  <div class="sae-container">
    <button class="p-4 px-6 mt-2 text-sm font-medium text-white rounded-lg">
      Ingresa a tus clases
    </button>
    <img src="../assets/sae.svg" alt="" class="mt-2 h-18">
  </div>
</template>
<style lang="postcss" scoped>
.header{
  height:70px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  z-index:20;
  @apply bg-black flex flex-row justify-between items-center px-8 fixed top-0 w-full md:px-14 z-10;
}
button{
    background: #F47647;
}
.sae-container{
  @apply hidden absolute bottom-6 right-6 md:flex justify-between md:items-center mb-2 gap-4 ;
}
</style>


