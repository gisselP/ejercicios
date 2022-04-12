


export const login = async ({ commit, state }, data) => {
  try {
    // aqui crear la logica para consultar si existe el usuario en tu lista de usuario
    console.log(state.usuarios, 'lista de usuarios')
    let indice = -1
    for (let i = 0; i < state.usuarios.length; i++) {
      if (state.usuarios[i].username == data.username) indice = i
    }
    if (indice == -1) return { ok: false, message: 'El usuario no existe' }
    commit('actualizarUsuario', state.usuarios[indice])

    return { ok: true, message: 'Bienvenido' + state.usuarios[indice].displayName }
  } catch (error) {
    return { ok: false, message: 'Error sin mensaje' }
  }
}
