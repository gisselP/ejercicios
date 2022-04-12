export { version } from '../../package.json'

export const dev = import.meta.env.DEV
export const prod = import.meta.env.PROD
export const mode = import.meta.env.MODE
export const isFlowEnable = import.meta.env.VITE_ENABLE_FLOW === 'true'
export const isDev = import.meta.env.VITE_DEV === 'true'
export const isStoreLoggerEnable = import.meta.env.VITE_ENABLE_STORE_LOGGER === 'true'

export const HOTJAR_ID = parseInt(import.meta.env.VITE_HOTJAR_ID)
export const STORE_USER = 'eva-un'
export const STORE_TOKEN = 'eva-tk'
export const STORE_COURSES = 'eva-co'
export const STORE_CLASSES = 'eva-cl'
export const STORE_SIDEBAR = 'eva-sb'
export const STORE_DARKMODE = 'eva-dt'
export const STORE_USER_INFO = 'eva-uc'
export const STORE_COURSE_MODE = 'eva-cm'
export const STORE_CURRENT_COURSES = 'eva-cr'

export const LEFT_COL_WIDTH = '193px'
export const RIGHT_COL_WIDTH = '360px'

export const USER_TYPES = ['alumno', 'docente', 'colaborador']

export const WEEK = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
export const WEEK_EVA = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
export const SHORTWEEK = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
export const MONTH = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]

export const REGEX_URL =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi
