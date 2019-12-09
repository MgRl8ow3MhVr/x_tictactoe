import React, { useState, useEffect } from "react";
console.log("Communicate Load");

const Communicate = ({ TTT, setTTT, ws, setWs }) => {
  const [playersList, setPlayersList] = useState([]);
  const [connected, setConnected] = useState(false);
  const [gamestarted, setGameStarted] = useState(false);
  const [theUserName, setTheUserName] = useState(null);

  const handleReceive = event => {
    const response = JSON.parse(event.data);
    switch (response.object) {
      case "newUser":
        console.log("newuser", response.playersList);
        setPlayersList(response.playersList);
        break;
      case "challenged":
        setGameStarted(true);
        alert(`you be been challenged by ${response.by}. You START`);
        setTTT({
          ...TTT,
          opponent: response.by,
          allowedToPlay: true,
          player: "X"
        });
        break;
      default:
        const TTTcopy = { ...TTT };
        TTTcopy.lastPlayed = [null, null];
        TTTcopy.allowedToPlay = true;
        TTTcopy.grid = response.grid;
        // TTTcopy.scoreX = response.scoreX;
        // TTTcopy.scoreO = response.scoreO;
        setTTT(TTTcopy);
        break;
    }
  };

  useEffect(() => {
    const connection = () => {
      const NewWs = new WebSocket("wss://backendtictactoe.herokuapp.com/");
      // const NewWs = new WebSocket("ws://localhost:8080");

      setWs(NewWs);
    };
    connection();
  }, []);

  useEffect(() => {
    if (ws) {
      ws.addEventListener("message", handleReceive);
    }
    return () => {
      if (ws) {
        ws.removeEventListener("message", handleReceive);
      }
    };
  }, [handleReceive]);

  return (
    <>
      <div className="starter">
        {/* # # # # # # Players List # # # # #  */}
        {!gamestarted && (
          <div className="playerslist">
            {playersList &&
              playersList.map((player, index) => {
                if (player !== TTT.username) {
                  return (
                    <h4
                      key={index}
                      onClick={() => {
                        setTTT({
                          ...TTT,
                          opponent: player,
                          player: "O"
                        });
                        setGameStarted(true);

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
        )}
        {/* # # # # # # CONNEXION # # # # #  */}
        {!connected && (
          <>
            <form
              onSubmit={event => {
                event.preventDefault();
                setConnected(true);
                setTTT({
                  ...TTT,
                  username: theUserName
                });
                ws.send(
                  JSON.stringify({
                    object: "enterArena",
                    username: theUserName
                  })
                );
              }}
            >
              <h2>Enter your own UserName to find other connected players</h2>
              <h2>
                Then clic on a player name to start a game against him || OR ||
                wait that someone invites you
              </h2>

              <input
                type="text"
                onChange={event => {
                  event.preventDefault();
                  setTheUserName(event.target.value);
                }}
              ></input>

              <input type="submit" value="find players"></input>
            </form>
          </>
        )}
      </div>
    </>
  );
};
export default Communicate;
