import React from "react";
// import DisplayReset from "./DisplayReset";

const SideMenu = ({ TTT, setTTT, thegrid }) => {
  return (
    <>
      <div className="sidemenu">
        <div className="score">
          <h2>Score</h2>
          <h2>
            {TTT.username + " (YOU)"}: {TTT.scoreX}
          </h2>
          <h2>
            {TTT.opponent + "(Opponent)"}: {TTT.scoreO}
          </h2>
        </div>
        <div className="conditions">
          <h2> Rules </h2>
          <h2>1 point per align {TTT.victory} </h2>

          <h2>Currentplayer: {TTT.player}</h2>
        </div>
        <button
          className="score"
          onClick={() => {
            if (TTT.lastPlayed[0] === null) {
              return;
            }
            const TTTcopy = { ...TTT };
            TTTcopy.grid[TTTcopy.lastPlayed[0]][TTTcopy.lastPlayed[1]] = -10;
            TTTcopy.allowedToPlay = true;
            setTTT(TTTcopy);
          }}
        >
          <h2>Undo last action </h2>
        </button>

        {/* <DisplayReset
          reset={params => {
            setTTT({
              grid: thegrid(params.size),
              player: "X",
              size: params.size,
              victory: params.victory,
              scoreX: 0,
              scoreO: 0
            });
          }}
        ></DisplayReset> */}
      </div>
    </>
  );
};

export default SideMenu;
