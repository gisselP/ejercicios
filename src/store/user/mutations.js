import { STORE_USER_INFO } from '@shared/constants'
import { DEFAULT_USER_STATE } from './state'

export const profileInfo = (state, userInfo) => {
  state.idArea = userInfo.idArea ?? null
  state.phone = userInfo.telefono ?? ''
  state.email = userInfo.correo ?? ''
  state.ubigeo = userInfo.ubigeo ?? ''
  state.address = userInfo.direccion ?? ''
  state.departament = userInfo.departamento ?? ''
  state.provincie = userInfo.provincia ?? ''
  state.district = userInfo.distrito ?? ''
  state.showPhone = userInfo.mostrarTelefono ?? false
  state.showEmail = userInfo.mostrarCorreo ?? false
  state.photo = userInfo.fotoPerfil ?? '/images/default-user.png'

  window.localStorage.setItem(STORE_USER_INFO, JSON.stringify(state))
}

export const updateFlowVersionState = (state, newState) => {
  state.newVersionAvailable = newState
}

export const updatePermissions = (state, permissionsList) => {
  state.permissions = permissionsList
}

export const updateStore = (state) => {
  const userInfo = JSON.parse(window.localStorage.getItem(STORE_USER_INFO))

  if (userInfo) {
    state.idArea = userInfo.idArea ?? null
    state.phone = userInfo.phone ?? ''
    state.email = userInfo.email ?? ''
    state.ubigeo = userInfo.ubigeo ?? ''
    state.address = userInfo.address ?? ''
    state.departament = userInfo.departament ?? ''
    state.provincie = userInfo.provincie ?? ''
    state.district = userInfo.district ?? ''
    state.showPhone = userInfo.showPhone ?? false
    state.showEmail = userInfo.showEmail ?? false
    state.photo = userInfo.photo ? userInfo.photo : '/images/default-user.png'
  }
}

export const updateaAttendance = (state, newValue) => {
  state.enableAttendanceBtn = newValue
}

export const restartStore = (state) => {
  for (const key in DEFAULT_USER_STATE) {
    state[key] = DEFAULT_USER_STATE[key]
  }
}

export const addNotification = (state, notification) => {
  state.notifications = [notification, ...state.notifications]
}
