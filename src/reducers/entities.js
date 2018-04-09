import { dissoc } from 'ramda'

const entities = (state = { 1: { x1: 20, y1: 100, width: 100, height: 100, id: 1 } }, {type, payload}) => {
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