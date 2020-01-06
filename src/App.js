import React, { useState } from "react";
import CreateGrid from "./components/CreateGrid";
import Communicate from "./components/Communicate";
import thegrid from "./components/TheGrid";
import "./App.css";

const App = () => {
  const [ws, setWs] = useState(null);

  const [TTT, setTTT] = useState({
    grid: thegrid(30),
    player: null,
    size: 15,
    victory: 4,
    scoreX: 0,
    scoreO: 0,
    lastPlayed: [null, null],
    stage: "entername",
    username: "NoUsername Yet",
    opponent: "NoOpponent Yet"
  });
  console.log(TTT);

  return (
    <div className="App">
      <header>
        <span>GIANT TIC TAC TOE</span>
        <span>Challenge your friends online</span>
      </header>
      <Communicate TTT={TTT} setTTT={setTTT} ws={ws} setWs={setWs} />
      <div className="game">
        <div className="board">
          <CreateGrid TTT={TTT} setTTT={setTTT} ws={ws} />
        </div>
      </div>
    </div>
  );
};

export default App;
