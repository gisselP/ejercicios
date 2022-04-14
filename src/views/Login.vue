<script setup>
import { ref, computed } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import Gtext from '@/components/Gtext.vue'

const usuario = ref('')

const store = useStore()
const route = useRoute()
const router = useRouter()

const rules = computed(() => {
  return {
    usuario: {required}
  }
})

const v$ = useVuelidate(rules, {usuario} )

const usuarioError = computed(() => {
  let error = []
  if (!v$.value.usuario.$dirty) return error
  v$.value.usuario.required.$invalid && error.push('¡Olvidaste llenar este campo!')
  return error
})

const agregarUsuario = async () =>{
  try {
    localStorage.setItem('usuario',JSON.stringify(usuario.value))
    const { ok, message } = await store.dispatch('user/login', { username: usuario.value })
    if (!ok) {
      console.log(message)
    } else {
      router.push({ name: 'home' })
    }
    alert (message)
  } catch (err) {
    console.log(err)
  }
  // localStorage.setItem('usuarios',JSON.stringify(usuario.value))
}

const validate = () =>{
  try {
    v$.value.$touch()
    if (v$.value.$invalid) {
      alert('Te faltó rellenar este campo')
    } else {
      agregarUsuario()
    }
  } catch (error) {
    console.log(error)
  }
}

</script>
<template>
  <section class="login">
      <p class="text-xl font-semibold text-white">Hola, soy</p>
      <img src="../assets/logo.svg" alt="eva" class="h-14">
      <form class="flex flex-col gap-4" @submit.prevent="validate">
        <Gtext   
          v-model="usuario"
          placeholder="Usuario"
          :error-messages="usuarioError"
          @input="v$.usuario.$touch()"
          class=""/>
        <button class="p-3 font-semibold text-white bg-black rounded-lg hover:bg-neutral-100 hover:text-black" type="submit"> Ingresar</button>
      </form>
  </section>
</template>

<style lang="postcss" scoped>
.login{
  height: 100vh;
  background-color: #F47647;
  @apply flex flex-col  justify-center items-center gap-6;
}
</style>

