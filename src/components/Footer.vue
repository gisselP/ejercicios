<script setup>
import Sidebar from '@/components/Sidebar.vue'
import Message from '@/components/Message.vue'

import { ref,watch } from 'vue'

const toggle=ref(false)
const post =ref(false)
const openPost = () =>{
  if (toggle.value){
    toggle.value=false
    post.value=true
  } else{   
    post.value=!post.value
  }
}

const openToggle=()=>{
   if (post.value){
    post.value=false
    toggle.value=true
  } else{   
    toggle.value=!toggle.value
  }
}
</script>
<template>
  <footer class="footer" >
    <button @click="openToggle">
      <img src="../assets/menu.svg" alt="" class="h-8 cursor-pointer lg:hidden">
    </button>
    <button @click="openPost" class="btnMore">
      <img src="../assets/mas.svg" alt="" class="h-4 mx-auto">
    </button>
    <h1 class="flex flex-col items-center text-xs font-medium text-gray">
      <img src="../assets/profile.png" alt="" class="h-6 rounded-full">
        Perfil
    </h1>
  </footer>
  <Sidebar class="toggle"  v-if="toggle" />
  <Message class="post"  v-if="post" />
</template>
<style lang="postcss" scoped>
.footer {
  background: #E5E5E5;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);
  @apply h-16 z-20 w-full fixed bottom-0 flex md:hidden justify-center items-center gap-5;
}
.toggle{
  background: #E5E5E5;
  height: calc(100% - 70px);
  top:70px;
  @apply fixed left-0 z-10 w-screen h-screen;  
}
.post{
  bottom:64px;
  transition: 0.5s;
  @apply fixed left-0 z-10 w-full md:hidden  ;  
}
.btnMore{
  background: #F47647;
  @apply rounded-md w-12 h-10 ;
}

</style>


