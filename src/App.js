import React, { useState } from "react";
import CreateGrid from "./CreateGrid";
import displayEnd from "./DisplayEnd";
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
    player: "X"
  });

  return (
    <div className="App">
      <CreateGrid TTT={TTT} setTTT={setTTT} size={12} />

      <h1>{TTT.player ? "X" : "O"} PLAYS</h1>

      {displayEnd(TTT.win, () => {
        setTTT({
          grid: thegrid(12),
          player: "X"
        });
      })}
    </div>
  );
};

export default App;
