import React from "react";
import checkWin from "./CheckWin";

const OneBox = props => {
  const { TTT, setTTT, r, c } = props;
  let state = TTT.grid[r][c];
  let grid = TTT.grid;
  let player = TTT.player;
  let nextplayer = player === "X" ? "O" : "X";
  // console.log(nextplayer);

  switch (state) {
    case -10:
      return (
        <div
          onClick={() => {
            grid[r][c] = player;
            let gridwin = checkWin(grid, r, c, player, TTT.victory);
            if (gridwin) {
              setTTT({
                grid: gridwin,
                player: nextplayer,
                size: TTT.size,
                victory: TTT.victory,
                scoreX: player === "X" ? TTT.scoreX + 1 : TTT.scoreX,
                scoreO: player === "O" ? TTT.scoreO + 1 : TTT.scoreO
              });
            } else {
              setTTT({
                grid: grid,
                player: nextplayer,
                size: TTT.size,
                victory: TTT.victory,
                scoreX: TTT.scoreX,
                scoreO: TTT.scoreO
              });
            }
          }}
          className="box empty"
        ></div>
      );
    case "WinO":
      return <div className="box WinO">O</div>;
    case "WinX":
      return <div className="box WinX">X</div>;
    case "O":
      return <div className="box O">O</div>;
    case "X":
      return <div className="box X">X</div>;
    default:
      return <div className="box empty">error</div>;
  }
};

export default OneBox;
