import React, { useState, useEffect } from "react";
import PlayersList from "./PlayersList";
import Connexion from "./Connexion";
import ScoreMenu from "./ScoreMenu";
import TypeMe from "./TypeMe";
// import Typing from "react-typing-animation";
// import Typist from "react-typist";
// import ReactTypingEffect from "react-typing-effect";

const Communicate = ({ TTT, setTTT, ws, setWs }) => {
  const [playersList, setPlayersList] = useState([]);
  const [instruction, setInstruction] = useState("Enter UserName");

  // # # # # # # # # # # # Connexion at WS Server on page landing # # # # # # # # # # #
  useEffect(() => {
    const connection = () => {
      const NewWs = new WebSocket("wss://backendtictactoe.herokuapp.com/");
      // const NewWs = new WebSocket("ws://localhost:8080");
      setWs(NewWs);
    };
    connection();
  }, []);

  // # # # # # # # # # # # Handling WS received messages # # # # # # # # # # #
  const handleReceive = event => {
    const response = JSON.parse(event.data);
    switch (response.object) {
      case "newUser":
        setPlayersList(response.playersList);
        break;
      case "challenged":
        setInstruction(`you be been challenged by ${response.by}. You START`);
        setTTT({
          ...TTT,
          opponent: response.by,
          allowedToPlay: true,
          player: "X",
          stage: "youplay"
        });
        break;
      default:
        const TTTcopy = { ...TTT };
        TTTcopy.lastPlayed = [null, null];
        TTTcopy.allowedToPlay = true;
        TTTcopy.grid = response.grid;

        setTTT(TTTcopy);
        break;
    }
  };
  // # # # # # # # # # # # Kill handler and create new one every message # # # # # # # # # # #
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

  // # # # # # # # # # # # R E N D E R # # # # # # # # # # #
  return (
    <>
      <div className="menu">
        {/* Instructions side - menuleft */}
        <div className="menuleft">
          <TypeMe aText={instruction} />
        </div>
        {/* # # # # # # CONNEXION # # # # #  */}
        {TTT.stage === "entername" && (
          <div className="menuright">
            <Connexion
              TTT={TTT}
              setTTT={setTTT}
              ws={ws}
              setInstruction={setInstruction}
            />
          </div>
        )}
        {/* # # # # # # PLAYERS LIST # # # # #  */}
        {TTT.stage === "findaplayer" && playersList && (
          <div className="menuright">
            <PlayersList
              TTT={TTT}
              setTTT={setTTT}
              ws={ws}
              playersList={playersList}
              setInstruction={setInstruction}
            />
          </div>
        )}
        {/* # # # # # # GAME IS ON # # # # #  */}
        {(TTT.stage === "youplay" || TTT.stage === "youwait") && (
          <div className="menuright">
            <ScoreMenu TTT={TTT} />
          </div>
        )}
      </div>
    </>
  );
};
export default Communicate;
