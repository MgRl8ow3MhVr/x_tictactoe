import React, { useState } from "react";
import CreateGrid from "./components/CreateGrid";
import Communicate from "./components/Communicate";
import SideMenu from "./components/SideMenu";

import "./App.css";

const thegrid = size => {
  let tab = [];
  for (let i = 0; i < size; i++) {
    let subtab = [];
    for (let j = 0; j < size; j++) {
      subtab.push(-10);
    }
    tab.push(subtab);
  }
  return tab;
};

const App = () => {
  const [TTT, setTTT] = useState({
    grid: thegrid(12),
    player: null,
    size: 12,
    victory: 4,
    scoreX: 0,
    scoreO: 0,
    lastPlayed: [null, null],
    allowedToPlay: false,
    username: "?????",
    opponent: "?????"
  });

  return (
    <div className="App">
      <header>Giant TIC TAC TOE</header>
      <Communicate TTT={TTT} setTTT={setTTT} />

      {/* <h3>
        X plays vs O <br></br>player gets 1 point per aligment vertical
        horizontal or diagonal{" "}
      </h3> */}

      <div className="game">
        <SideMenu TTT={TTT} setTTT={setTTT} thegrid={thegrid} />

        <div className="board">
          <CreateGrid TTT={TTT} setTTT={setTTT} />
        </div>
      </div>
    </div>
  );
};

export default App;
