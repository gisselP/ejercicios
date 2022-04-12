export const DEFAULT_USER_STATE = {
  usuarios: [
    { username: 'gissel', displayName: 'Gissel Peña'},
    { username: 'ahurtado', displayName: 'Andy Hurtado'}
  ],
  userLog: null
}

export default () => ({ ...DEFAULT_USER_STATE })
