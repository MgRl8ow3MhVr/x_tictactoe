import React from "react";

const PlayersList = ({ TTT, setTTT, ws, playersList }) => {
  // # # # # # # # # # # # R E N D E R # # # # # # # # # # #

  return (
    <div className="playerslist">
      {playersList.map((player, index) => {
        if (player !== TTT.username) {
          return (
            <h4
              key={index}
              onClick={() => {
                setTTT({
                  ...TTT,
                  opponent: player,
                  player: "O",
                  stage: "youwait"
                });

                ws.send(
                  JSON.stringify({
                    object: "challenge",
                    challenger: TTT.username,
                    opponent: player
                  })
                );
                alert(
                  `You challenged ${player}. "He is X, you are O, wait that he plays first"`
                );
              }}
            >
              {player}
            </h4>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};
export default PlayersList;
