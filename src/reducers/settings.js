const tools = (state = { gridSize: 20 }, {type, payload}) => {
  switch (type) {
    case 'GRID_SIZE_SET':
      return { gridSize: payload }
    default:
      return state
  }
}

export default tools
