


export const login = async ({ commit, state }, data) => {
  try {
    // aqui crear la logica para consultar si existe el usuario en tu lista de usuario
   
    const usuario = state.usuarios.find ((element) => element.username === data.username)
    if( !usuario ) return { ok: false, message: 'El usuario no existe' }
    commit('actualizarUsuario', usuario)
    
    return { ok: true, message: `Bienvenido ${usuario.displayName}`,  }
  } catch (error) {
    return { ok: false, message: 'Error sin mensaje' }
  }
}
