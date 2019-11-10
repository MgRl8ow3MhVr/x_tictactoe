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
  if (sumRight + sumLeft === victorynum - 1) {
    victory.map(el => {
      grid[el[0]][el[1]] = "Win" + player;
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
  if (sumUp + sumDown === victorynum - 1) {
    victory.map(el => {
      grid[el[0]][el[1]] = "Win" + player;
    });
    grid[r][c] = "Win" + player;

    return grid;
  }
  return null;
};

const checkWin = (grid, r, c, player, victory) => {
  // let checkColss = checkCols(grid);
  // if (checkColss) {
  //   return checkColss;
  // }
  let checkRowss = checkRows(grid, r, c, player, victory);
  // if (checkRowss) {
  if (checkRowss) {
    return checkRowss;
  }
  return checkCols(grid, r, c, player, victory);
  // }

  // return CheckDiag(grid);
};

export default checkWin;
