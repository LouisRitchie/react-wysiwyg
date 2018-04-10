export const focusID = id => ({
  type: 'ID_FOCUS',
  payload: { id }
})

export const selectID = id => ({
  type: 'ID_SELECT',
  payload: { id }
})

export const deselectID = id => ({
  type: 'ID_DESELECT',
  payload: { id }
})