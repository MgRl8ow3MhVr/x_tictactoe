import React from "react";
// import DisplayReset from "./DisplayReset";

const SideMenu = ({ TTT }) => {
  return (
    <>
      <h2>Score</h2>
      <h2>
        {TTT.username + " (YOU)"}: {TTT.scoreX}
      </h2>
      <h2>
        {TTT.opponent + "(Opponent)"}: {TTT.scoreO}
      </h2>

      <h2> Rules </h2>
      <h2>1 point per align {TTT.victory} </h2>

      <h2>Currentplayer: {TTT.player}</h2>
    </>
  );
};

export default SideMenu;
