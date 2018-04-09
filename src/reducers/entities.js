import { append, dissoc } from 'ramda'

const entities = (state = [], {type, payload}) => {
  switch (type) {
    case 'ENTITY_ADD':
      return append(payload, state)
    case 'ENTITY_REMOVE':
      return dissoc(payload.id, state)
    default:
      return state
  }
}

export default entities