export const selectID = id => ({
  type: 'ID_SELECT',
  payload: { id }
})

export const deselectID = id => ({
  type: 'ID_DESELECT',
  payload: { id }
})