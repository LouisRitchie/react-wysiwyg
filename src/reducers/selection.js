const selection = (state = [], {type, payload}) => {
  switch (type) {
    case 'SELECTION_ADD_ID':
      return [ ...state, { ...payload } ]
    case 'SELECTION_DELETE_ID':
      return state.filter(entity => entity.id !== payload.id)
    default:
      return state
  }
}

export default selection