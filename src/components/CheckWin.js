// # # # # # # # # # CHECK ROWS # # # # # # # # # # #

const checkRows = (grid, r, c, player, victorynum) => {
  const size = grid[0].length
  let victory = []
  // ReUse winner case as victory if it's not a Row Victory
  const countsAsVictory = (r, c) => {
    return (
      grid[r][c] === player ||
      grid[r][c] === 'WinC_' + player ||
      grid[r][c] === 'WinD1_' + player ||
      grid[r][c] === 'WinD2_' + player
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
      grid[el[0]][el[1]] = 'WinR_' + player
      return null
    })
    grid[r][c] = 'WinR_' + player

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
    return (
      grid[r][c] === player ||
      grid[r][c] === 'WinR_' + player ||
      grid[r][c] === 'WinD1_' + player ||
      grid[r][c] === 'WinD2_' + player
    )
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
      grid[el[0]][el[1]] = 'WinC_' + player
      return null
    })
    grid[r][c] = 'WinC_' + player

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
    return (
      grid[r][c] === player ||
      grid[r][c] === 'WinR_' + player ||
      grid[r][c] === 'WinC_' + player ||
      grid[r][c] === 'WinD2_' + player
    )
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
      grid[el[0]][el[1]] = 'WinD1_' + player
      return null
    })
    grid[r][c] = 'WinD1_' + player

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
    return (
      grid[r][c] === player ||
      grid[r][c] === 'WinR_' + player ||
      grid[r][c] === 'WinC_' + player ||
      grid[r][c] === 'WinD1_' + player
    )
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
      grid[el[0]][el[1]] = 'WinD2_' + player
      return null
    })
    grid[r][c] = 'WinD2_' + player

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
