export const DEFAULT_USER_STATE = {
  idArea: null,
  phone: '',
  email: '',
  address: '',
  ubigeo: '',
  departament: '',
  provincie: '',
  district: '',
  permissions: [],
  showPhone: false,
  showEmail: false,
  notifications: [],
  newVersionAvailable: false,
  enableAttendanceBtn: false,
  photo: '/images/default-user.png',
}

export default () => ({ ...DEFAULT_USER_STATE })
