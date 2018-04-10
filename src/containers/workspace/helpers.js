// take x and y position of user-drawn rectangle, and pass them to a function curried with grid size, that returns x and y coordinates
export const snapToGridFactory = gridSize => ([x1, y1], [x2, y2]) => ({
  top: Math.floor(Math.min(y1, y2) / gridSize),
  left: Math.floor(Math.min(x1, x2) / gridSize),
  height: Math.floor(Math.abs(y2 - y1) / gridSize),
  width: Math.floor(Math.abs(x2 - x1) / gridSize)
})

export const getTLHW = (startCoords, currentCoords) => {
  let result = [] // [top, left, height, width]

  if (currentCoords[0] > startCoords[0]) {
    result[1] = startCoords[0]
    result[3] = currentCoords[0] - startCoords[0]
  } else {
    result[1] = currentCoords[0]
    result[3] = startCoords[0] - currentCoords[0]
  }

  if (currentCoords[1] > startCoords[1]) {
    result[0] = startCoords[1]
    result[2] = currentCoords[1] - startCoords[1]
  } else {
    result[0] = currentCoords[1]
    result[2] = startCoords[1] - currentCoords[1]
  }

  return { top: result[0], left: result[1], height: result[2], width: result[3] }
}