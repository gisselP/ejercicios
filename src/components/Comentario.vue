<script setup>
import { ref,onMounted,watch,computed } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import Gtext from '@/components/Gtext.vue'

const comentarioUsuario = ref('')
const publicaciones = ref([])
const emit = defineEmits(['enviar-item'])

const props = defineProps({
  id: { type: Number, default: null},
  actualizarComentario: { 
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

const agregarComentario = () =>{
  const { comentarios } = publicaciones.value.find((item)=>item.id=== props.id)
  comentarios.unshift({ comentario : comentarioUsuario.value })
 
  emit('enviar-item', publicaciones.value)
  localStorage.setItem('publicaciones',JSON.stringify(publicaciones.value))
  comentarioUsuario.value =''
  v$.value.$reset()
}

const validate = (evento) =>{
  try {
    if (evento.code != 'Enter') return
    v$.value.$touch()
    if (v$.value.$invalid) {
      alert('¿Ey no querías publicar?')
    } else {
      agregarComentario()
    }
  } catch (error) {
    console.log(error)
  }
}

watch(
  () => props.actualizarComentario,
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
  <section class="py-4 profile">
    <div class="mx-auto ">
      <img src="../assets/profile.png" alt="" class="rounded-full h-9">
    </div>
      <form class="relative" @keyup="validate({ code: $event.key })" >
        <Gtext
          v-model="comentarioUsuario"
          type="text"
          placeholder="Escribe un comentario"
          @input="v$.comentarioUsuario.$touch()"
        />
        <button type="submit" class="btn" @click="validate({ code: 'Enter' })" ><img src="../assets/enviar.svg" alt="" class="h-4"></button>
      </form>
  </section>
</template>
<style lang="postcss" scoped>
.profile{
  display: grid;
  grid-template-columns: 40px 1fr;
  @apply  justify-center gap-1 ;
}
.btn{
  top:2.2px;
  @apply absolute right-1 p-2 rounded-r-xl bg-neutral-100;
}
</style>