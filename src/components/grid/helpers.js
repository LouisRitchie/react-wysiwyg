const TOP_BORDER_STYLE = { borderTop: '1px solid blue' }
const BOTTOM_BORDER_STYLE = { borderBottom: '1px solid blue' }
const LEFT_BORDER_STYLE = { borderLeft: '1px solid blue' }
const RIGHT_BORDER_STYLE = { borderRight: '1px solid blue' }

export const orderCoordinates = ([[x1, y1], [x2, y2]]) => {
  if (x1 < x2 && y1 < y2) { return [[x1, y1], [x2, y2]] }
  if (x1 > x2 && y1 < y2) { return [[x2, y1], [x1, y2]] }
  if (x1 < x2 && y1 > y2) { return [[x1, y2], [x2, y1]] }
  return [[x2, y2], [x1, y1]]
}

export const isQuadrantColoured = (quadrantCoords, currentSquareCoords) => {
  const [x, y, i] = quadrantCoords

  const [ [x1, y1], [x2, y2] ] = currentSquareCoords

  if (x === x1 && y === y1) { return i === 4 }
  if (x === x2 && y === y1) { return i === 3 }
  if (x === x1 && y === y2) { return i === 2 }
  if (x === x2 && y === y2) { return i === 1 }
  if (x > x1 && x < x2) {
    if (y === y1) { return (i === 3 || i === 4) }
    if (y === y2) { return (i === 1 || i === 2) }
    if (y > y1 && y < y2) { return true }
  }
  if (y > y1 && y < y2) {
    if (x === x1) { return (i === 2 || i === 4) }
    if (x === x2) { return (i === 1 || i === 3) }
    if (x > x1 && x < x2) { return true }
  }
}

export const getQuadrantBorderStyle = (quadrantCoords, selectedCoords, hoveredCoords) => {
  const [x, y, i] = quadrantCoords

  const [[x1, y1], [x2, y2]] = orderCoordinates([selectedCoords, hoveredCoords])

  if (x === x1 && y === y1) {
    return i === 4 ? { ...TOP_BORDER_STYLE, ...LEFT_BORDER_STYLE } : {}
  }

  if (x === x2 && y === y1) {
    return i === 3 ? { ...TOP_BORDER_STYLE, ...RIGHT_BORDER_STYLE } : {}
  }

  if (x === x1 && y === y2) {
    return i === 2 ? { ...BOTTOM_BORDER_STYLE, ...LEFT_BORDER_STYLE } : {}
  }

  if (x === x2 && y === y2) {
    return i === 1 ? { ...BOTTOM_BORDER_STYLE, ...RIGHT_BORDER_STYLE } : {}
  }

  if (x > x1 && x < x2) {
    if (y === y1) {
      return (i === 3 || i === 4) ? TOP_BORDER_STYLE : {}
    }
    if (y === y2) {
      return (i === 1 || i === 2) ? BOTTOM_BORDER_STYLE : {}
    }
  }
  if (y > y1 && y < y2) {
    if (x === x1) {
      return (i === 2 || i === 4) ? LEFT_BORDER_STYLE : {}
    }
    if (x === x2) {
      return (i === 1 || i === 3) ? RIGHT_BORDER_STYLE : {}
    }
  }

  return {}
}