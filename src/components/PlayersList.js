import React from "react";

const PlayersList = ({ TTT, setTTT, ws, playersList, setInstruction }) => {
  // # # # # # # # # # # # R E N D E R # # # # # # # # # # #
  if (playersList.length < 2) {
    return (
      <div className="playerslist">
        <h5 style={{ fontsize: "10px" }}>You are all allone :(</h5>
      </div>
    );
  } else {
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

                  setInstruction(
                    `You challenged ${player}. "He is X, you are O, he plays first"`
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
  }
};
export default PlayersList;
