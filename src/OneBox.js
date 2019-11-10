import React from "react";
import checkWin from "./CheckWin";

const OneBox = props => {
  const { TTT, setTTT, r, c } = props;
  let state = TTT.grid[r][c];
  let grid = TTT.grid;
  let player = TTT.player;
  let nextplayer = player === "X" ? "O" : "X";
  console.log(nextplayer);

  switch (state) {
    case -10:
      return (
        <div
          onClick={() => {
            grid[r][c] = player;
            let gridwin = checkWin(grid, r, c, player);
            if (gridwin) {
              console.log("WIN");
              setTTT({ grid: gridwin, player: player, win: true });
            } else {
              setTTT({ grid: grid, player: nextplayer });
            }
          }}
          className="box empty"
        ></div>
      );
    case "Win":
      return <div className="box Win">{player}</div>;
    case "O":
      return <div className="box O">O</div>;
    case "X":
      return <div className="box X">X</div>;
    default:
      return <div className="box empty">error</div>;
  }
};

export default OneBox;
