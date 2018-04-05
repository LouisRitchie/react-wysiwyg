const selection = (state = [], {type, payload}) => {
  switch (type) {
    case 'ID_SELECT':
      return [ ...state, payload.id ]
    case 'ID_DESELECT':
      return state.filter(id => id !== payload.id)
    default:
      return state
  }
}

export default selection