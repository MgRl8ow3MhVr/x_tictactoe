const checkRows = (grid, r, c, player, victorynum) => {
  const size = grid[0].length;
  let victory = [];
  //check right
  let currCol = c + 1;
  let sumRight = 0;
  while (grid[r][currCol] === player && currCol < size) {
    sumRight += 1;
    victory.push([r, currCol]);
    currCol++;
  }
  //check left
  currCol = c - 1;
  let sumLeft = 0;
  while (grid[r][currCol] === player && currCol >= 0) {
    sumLeft += 1;
    victory.push([r, currCol]);
    currCol--;
  }

  //Check Total
  if (sumRight + sumLeft >= victorynum - 1) {
    victory.map(el => {
      grid[el[0]][el[1]] = "Win" + player;
      return null;
    });
    grid[r][c] = "Win" + player;

    return grid;
  }
  return null;
};

const checkCols = (grid, r, c, player, victorynum) => {
  const size = grid[0].length;
  let victory = [];
  //check up
  let currLign = r - 1;
  let sumUp = 0;
  while (currLign >= 0 && grid[currLign][c] === player) {
    sumUp += 1;
    victory.push([currLign, c]);
    currLign--;
  }
  //check Up
  currLign = r + 1;
  let sumDown = 0;
  while (currLign < size && grid[currLign][c] === player) {
    sumDown += 1;
    victory.push([currLign, c]);
    currLign++;
  }

  //Check Total
  if (sumUp + sumDown >= victorynum - 1) {
    victory.map(el => {
      grid[el[0]][el[1]] = "Win" + player;
      return null;
    });
    grid[r][c] = "Win" + player;

    return grid;
  }
  return null;
};

const checkdiag1 = (grid, r, c, player, victorynum) => {
  const size = grid[0].length;
  let victory = [];
  //check up
  let currLign = r - 1;
  let currCol = c - 1;
  let sumUp = 0;
  while (currLign >= 0 && currCol >= 0 && grid[currLign][currCol] === player) {
    sumUp += 1;
    victory.push([currLign, currCol]);
    currLign--;
    currCol--;
  }
  //check Up
  currLign = r + 1;
  currCol = c + 1;
  let sumDown = 0;
  while (
    currLign < size &&
    currCol < size &&
    grid[currLign][currCol] === player
  ) {
    sumDown += 1;
    victory.push([currLign, currCol]);
    currLign++;
    currCol++;
  }

  //Check Total
  if (sumUp + sumDown >= victorynum - 1) {
    victory.map(el => {
      grid[el[0]][el[1]] = "Win" + player;
      return null;
    });
    grid[r][c] = "Win" + player;

    return grid;
  }
  return null;
};

const checkdiag2 = (grid, r, c, player, victorynum) => {
  const size = grid[0].length;
  let victory = [];
  //check up
  let currLign = r - 1;
  let currCol = c + 1;
  let sumUp = 0;
  while (
    currLign >= 0 &&
    currCol < size &&
    grid[currLign][currCol] === player
  ) {
    sumUp += 1;
    victory.push([currLign, currCol]);
    currLign--;
    currCol++;
  }
  //check Up
  currLign = r + 1;
  currCol = c - 1;
  let sumDown = 0;
  while (
    currLign < size &&
    currCol >= 0 &&
    grid[currLign][currCol] === player
  ) {
    sumDown += 1;
    victory.push([currLign, currCol]);
    currLign++;
    currCol--;
  }

  //Check Total
  if (sumUp + sumDown >= victorynum - 1) {
    victory.map(el => {
      grid[el[0]][el[1]] = "Win" + player;
      return null;
    });
    grid[r][c] = "Win" + player;

    return grid;
  }
  return null;
};

const checkWin = (grid, r, c, player, victory) => {
  let check = checkRows(grid, r, c, player, victory);
  if (check) {
    return check;
  }
  check = checkCols(grid, r, c, player, victory);
  if (check) {
    return check;
  }
  check = checkdiag1(grid, r, c, player, victory);
  if (check) {
    return check;
  }

  return checkdiag2(grid, r, c, player, victory);
};

export default checkWin;
