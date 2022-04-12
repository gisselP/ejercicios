import { http } from '@hooks/shared'
import { USER_TYPES } from '@shared/constants'

export const profileService = async ({ commit, rootGetters }) => {
  const userTypeNumber = rootGetters['auth/getAuthData']('userType')
  const userType = USER_TYPES[userTypeNumber - 1]

  try {
    const { data } = await http.get(`perfil/${userType}/datospersonales`)
    commit('profileInfo', data.results)
    return { ok: true, message: data.messagePublic }
  } catch (error) {
    return { ok: false, message: 'Error sin mensaje' }
  }
}

// http://localhost:56386/api/v3/usuario/permisos
export const permissionsService = async ({ commit }) => {
  try {
    const { data } = await http.get('usuario/permisos')
    commit('updatePermissions', data.results)

    return { ok: true, message: data.messagePublic }
  } catch (error) {
    return { ok: false, message: 'Error sin mensaje' }
  }
}
