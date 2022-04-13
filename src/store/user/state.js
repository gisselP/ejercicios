export const DEFAULT_USER_STATE = {
  usuarios:[
    { username: 'gpenac', displayName: 'Gissel Peña' },
    { username: 'ahurtado', displayName: 'Andy Hurtado' },
  ],
  userLog:'ahurtado'
}

export default () => ({ ...DEFAULT_USER_STATE })
