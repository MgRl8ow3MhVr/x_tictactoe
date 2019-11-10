const checkRows = (grid, r, c, player) => {
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
  console.log("sumRight", sumRight);
  //check left
  currCol = c - 1;
  let sumLeft = 0;
  while (grid[r][currCol] === player && currCol >= 0) {
    sumLeft += 1;
    victory.push([r, currCol]);
    currCol--;
  }
  console.log("sumLeft", sumLeft);

  //Check Total
  if (sumRight + sumLeft === 3) {
    victory.map(el => {
      grid[el[0]][el[1]] = "Win";
      grid[r][c] = "Win";
    });
    return grid;
  }
  return null;
};

// const checkCols = grid => {
//   const size = grid[0].length;
//   for (let i = 0; i < size; i++) {
//     let sum = 0;
//     for (let j = 0; j < size; j++) {
//       sum += grid[j][i];
//     }
//     if (sum === size || sum === 0) {
//       //changer les cases
//       for (let j = 0; j < size; j++) {
//         grid[j][i] = "Win";
//       }
//       return grid;
//     }
//   }
//   return null;
// };

// const CheckDiag = grid => {
//   const size = grid[0].length;
//   let sum = 0;
//   //Diagonale 1
//   for (let i = 0; i < size; i++) {
//     sum += grid[i][i];
//   }
//   if (sum === size || sum === 0) {
//     //changer les cases
//     for (let j = 0; j < size; j++) {
//       grid[j][j] = "Win";
//     }
//     return grid;
//   }
//   sum = 0;
//   for (let i = 0; i < size; i++) {
//     sum += grid[i][size - 1 - i];
//   }
//   if (sum === size || sum === 0) {
//     //changer les cases
//     for (let j = 0; j < size; j++) {
//       grid[j][size - 1 - j] = "Win";
//     }
//     return grid;
//   }

//   return null;
// };

const checkWin = (grid, r, c, player) => {
  // let checkColss = checkCols(grid);
  // if (checkColss) {
  //   return checkColss;
  // }
  let checkRowss = checkRows(grid, r, c, player);
  // if (checkRowss) {
  return checkRowss;
  // }

  // return CheckDiag(grid);
};

export default checkWin;
