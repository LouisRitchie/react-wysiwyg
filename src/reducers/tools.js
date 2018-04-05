const settings = (state = 'RECTANGLE_TOOL', {type, payload}) => {
  switch (type) {
    case 'TOOL_SET':
      return payload.tool
    default:
      return state
  }
}

export default settings