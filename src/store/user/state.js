export const DEFAULT_USER_STATE = {
  usuarios: [
    { username: 'gpenac', 
      displayName: 'Gissel Peña',
      mensaje:'',
      comentarios:[],
      id: 1,
      likes:[]
    },
    { username: 'ahurtado',
      displayName: 'Andy Hurtado', 
      mensaje:'',
      comentarios:[],
      id:2,
      likes:[]
    }
  ],
  userLog: null
}

export default () => ({ ...DEFAULT_USER_STATE })
