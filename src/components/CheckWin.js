// # # # # # # # # # CHECK ROWS # # # # # # # # # # #

const checkRows = (grid, r, c, player, victorynum) => {
  const size = grid[0].length
  let victory = []
  // ReUse winner case as victory if it's not a Row Victory
  // it's not a Row Victory if it doesn't include 'R' inside name
  const countsAsVictory = (r, c) => {
    return (
      // Si contient le nom du player MAIS ne contient pas R
      grid[r][c].indexOf(player) !== -1 && grid[r][c].indexOf('R') === -1
    )
  }

  //check right
  let currCol = c + 1
  let sumRight = 0

  while (countsAsVictory(r, currCol) && currCol < size) {
    sumRight += 1
    victory.push([r, currCol])
    currCol++
  }
  //check left
  currCol = c - 1
  let sumLeft = 0
  // Player && Not at the TopYet && sum is not already good
  while (
    countsAsVictory(r, currCol) &&
    currCol >= 0 &&
    sumRight + sumLeft < victorynum - 1
  ) {
    sumLeft += 1
    victory.push([r, currCol])
    currCol--
  }

  //Check Total
  if (sumRight + sumLeft >= victorynum - 1) {
    victory.map(el => {
      grid[el[0]][el[1]] = grid[el[0]][el[1]] + 'R'
      return null
    })
    // cette case ne pouvait pas etre gagnante avant.
    grid[r][c] = player + 'R'

    return grid
  }
  return null
}

// # # # # # # # # # CHECK COLS # # # # # # # # # # #

const checkCols = (grid, r, c, player, victorynum) => {
  const size = grid[0].length
  let victory = []
  // ReUse winner case as victory if it's not a Row Victory
  const countsAsVictory = (r, c) => {
    return grid[r][c].indexOf(player) !== -1 && grid[r][c].indexOf('C') === -1
  }

  //check up
  let currLign = r - 1
  let sumUp = 0

  while (currLign >= 0 && countsAsVictory(currLign, c)) {
    sumUp += 1
    victory.push([currLign, c])
    currLign--
  }
  //check Up
  currLign = r + 1
  let sumDown = 0
  while (
    currLign < size &&
    countsAsVictory(currLign, c) &&
    sumUp + sumDown < victorynum - 1
  ) {
    sumDown += 1
    victory.push([currLign, c])
    currLign++
  }

  //Check Total
  if (sumUp + sumDown >= victorynum - 1) {
    victory.map(el => {
      grid[el[0]][el[1]] = grid[el[0]][el[1]] + 'C'
      return null
    })
    grid[r][c] = player + 'C'

    return grid
  }
  return null
}

// # # # # # # # # # CHECK DIAG1 # # # # # # # # # # #

const checkdiag1 = (grid, r, c, player, victorynum) => {
  const size = grid[0].length
  let victory = []

  // ReUse winner case as victory
  const countsAsVictory = (r, c) => {
    return grid[r][c].indexOf(player) !== -1 && grid[r][c].indexOf('D1') === -1
  }

  //check up
  let currLign = r - 1
  let currCol = c - 1
  let sumUp = 0
  while (currLign >= 0 && currCol >= 0 && countsAsVictory(currLign, currCol)) {
    sumUp += 1
    victory.push([currLign, currCol])
    currLign--
    currCol--
  }
  //check Up
  currLign = r + 1
  currCol = c + 1
  let sumDown = 0
  while (
    currLign < size &&
    currCol < size &&
    countsAsVictory(currLign, currCol) &&
    sumUp + sumDown < victorynum - 1
  ) {
    sumDown += 1
    victory.push([currLign, currCol])
    currLign++
    currCol++
  }

  //Check Total
  if (sumUp + sumDown >= victorynum - 1) {
    victory.map(el => {
      grid[el[0]][el[1]] = grid[el[0]][el[1]] + 'D1'
      return null
    })
    grid[r][c] = player + 'D1'

    return grid
  }
  return null
}

// # # # # # # # # # CHECK DIAG2 # # # # # # # # # # #

const checkdiag2 = (grid, r, c, player, victorynum) => {
  const size = grid[0].length
  let victory = []
  // ReUse winner case as victory
  const countsAsVictory = (r, c) => {
    return grid[r][c].indexOf(player) !== -1 && grid[r][c].indexOf('D2') === -1
  }

  //check up
  let currLign = r - 1
  let currCol = c + 1
  let sumUp = 0
  while (
    currLign >= 0 &&
    currCol < size &&
    countsAsVictory(currLign, currCol)
  ) {
    sumUp += 1
    victory.push([currLign, currCol])
    currLign--
    currCol++
  }
  //check Up
  currLign = r + 1
  currCol = c - 1
  let sumDown = 0
  while (
    currLign < size &&
    currCol >= 0 &&
    countsAsVictory(currLign, currCol) &&
    sumUp + sumDown < victorynum - 1
  ) {
    sumDown += 1
    victory.push([currLign, currCol])
    currLign++
    currCol--
  }

  //Check Total
  if (sumUp + sumDown >= victorynum - 1) {
    victory.map(el => {
      grid[el[0]][el[1]] = grid[el[0]][el[1]] + 'D2'
      return null
    })
    grid[r][c] = player + 'D2'

    return grid
  }
  return null
}

const checkWin = (grid, r, c, player, victory) => {
  let check = checkRows(grid, r, c, player, victory)
  if (check) {
    return check
  }
  check = checkCols(grid, r, c, player, victory)
  if (check) {
    return check
  }
  check = checkdiag1(grid, r, c, player, victory)
  if (check) {
    return check
  }

  return checkdiag2(grid, r, c, player, victory)
}

export default checkWin
