export const addEntity = (id, options) => ({
  type: 'ENTITY_ADD',
  payload: { id, ...options }
})

export const deleteEntity = id => ({
  type: 'ENTITY_ADD',
  payload: { id }
})