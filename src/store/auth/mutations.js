import jwt_decode from 'jwt-decode'
import { STORE_USER, STORE_TOKEN } from '@shared/constants'
import { capitalizeWord, capitalizeSentence } from '@shared/filters'
import { DEFAULT_AUTH_STATE } from './state'

export const loginUser = (
  state,
  { token, apellidoPaterno, apellidoMaterno, nombreCompleto, sobreNombre, usuario, ciclo, nombreProducto }
) => {
  const userInfo = {
    name: capitalizeWord(sobreNombre),
    apPa: capitalizeWord(apellidoPaterno),
    apMa: capitalizeWord(apellidoMaterno),
    fullName: capitalizeSentence(nombreCompleto),
    product: capitalizeWord(nombreProducto),
    userCode: usuario,
    module: ciclo,
  }

  window.localStorage.setItem(STORE_USER, JSON.stringify(userInfo))

  if (token) {
    window.localStorage.setItem(STORE_TOKEN, token)
    const { tip, iat, exp, user, ida, idu, mat } = jwt_decode(token)

    state.token = token
    state.userId = idu
    state.matricula = mat,
    state.idActor = ida
    state.userType = tip
    state.username = user
    state.tokenIssue = iat
    state.tokenExpire = exp
    state.module = userInfo.module
    state.product = userInfo.product
    state.displayName = userInfo.name
    state.userCode = userInfo.userCode
    state.fullDisplayName = userInfo.fullName
  }
}

export const restartStore = (state) => {
  for (const key in DEFAULT_AUTH_STATE) {
    state[key] = DEFAULT_AUTH_STATE[key]
  }
}
