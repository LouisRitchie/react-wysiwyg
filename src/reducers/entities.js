import { dissoc } from 'ramda'

const entities = (state = {}, {type, payload}) => {
  switch (type) {
    case 'ENTITY_ADD':
      return Object.assign({}, state, payload)
    case 'ENTITY_REMOVE':
      return dissoc(payload.id, state)
    default:
      return state
  }
}

export default entities