import { http } from '@hooks/shared'

export const loginService = async ({ commit, dispatch }, { usuario, clave }) => {
  try {
    const { data } = await http.post('login', { usuario, clave })

    commit('loginUser', data.results)
    dispatch('user/profileService', {}, { root: true })

    return { ok: true, message: data.messagePublic }
  } catch (error) {
    const { response } = error || {}
    const { data } = response || {}
    const message = data || ''
    return { ok: false, message }
  }
}
