import React, { useState, useEffect } from "react";
import CreateGrid from "./components/CreateGrid";
import Communicate from "./components/Communicate";
import SideMenu from "./components/SideMenu";
import thegrid from "./components/TheGrid";
import "./App.css";
// import Connection from "./components/Connection";

const App = () => {
  const [ws, setWs] = useState(null);

  const [TTT, setTTT] = useState({
    grid: thegrid(12),
    player: null,
    size: 12,
    victory: 4,
    scoreX: 0,
    scoreO: 0,
    lastPlayed: [null, null],
    allowedToPlay: false,
    username: "NoUsername Yet",
    opponent: "NoOpponent Yet"
  });
  console.log(TTT);

  return (
    <div className="App">
      <header>Giant TIC TAC TOE</header>
      <Communicate TTT={TTT} setTTT={setTTT} ws={ws} setWs={setWs} />

      <div className="game">
        <SideMenu TTT={TTT} setTTT={setTTT} thegrid={thegrid} />

        <div className="board">
          <CreateGrid TTT={TTT} setTTT={setTTT} ws={ws} />
        </div>
      </div>
    </div>
  );
};

export default App;
