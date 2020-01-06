import React, { useState, useEffect } from "react";
import PlayersList from "./PlayersList";
import Connexion from "./Connexion";
import SideMenu from "./SideMenu";
import Typing from "react-typing-animation";

const Communicate = ({ TTT, setTTT, ws, setWs }) => {
  const [playersList, setPlayersList] = useState([]);

  // # # # # # # # # # # # Connexion at WS Server on page landing # # # # # # # # # # #
  useEffect(() => {
    const connection = () => {
      // const NewWs = new WebSocket("wss://backendtictactoe.herokuapp.com/");
      const NewWs = new WebSocket("ws://localhost:8080");
      setWs(NewWs);
    };
    connection();
  }, []);

  // # # # # # # # # # # # Handling WS received messages # # # # # # # # # # #
  const handleReceive = event => {
    const response = JSON.parse(event.data);
    switch (response.object) {
      case "newUser":
        console.log("newuser", response.playersList);
        setPlayersList(response.playersList);
        break;
      case "challenged":
        alert(`you be been challenged by ${response.by}. You START`);
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
        {/* # # # # # # CONNEXION # # # # #  */}
        {TTT.stage === "entername" && (
          <>
            <Typing speed={10}>
              <h2>Enter user name</h2>
            </Typing>
            <Connexion TTT={TTT} setTTT={setTTT} ws={ws} />
          </>
        )}
        {/* # # # # # # PLAYERS LIST # # # # #  */}
        {TTT.stage === "findaplayer" && playersList && (
          <>
            <Typing speed={10}>
              <h2>click on a playername to challenge him</h2>
            </Typing>
            <PlayersList
              TTT={TTT}
              setTTT={setTTT}
              ws={ws}
              playersList={playersList}
            />
          </>
        )}
        {/* # # # # # # GAME IS ON # # # # #  */}
        {(TTT.stage === "youplay" || TTT.stage === "youwait") && (
          <SideMenu TTT={TTT} />
        )}
      </div>
    </>
  );
};
export default Communicate;
