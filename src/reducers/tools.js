
const settings = (state = 'RECTANGLE_TOOL', {type, payload}) => {
  switch (type) {
    case 'CHANGE_TOOL':
      return payload.tool
    default:
      return state
  }
}

export default settings
