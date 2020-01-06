import React, { useState } from "react";

const Connexion = ({ TTT, setTTT, ws, setInstruction }) => {
  const [theUserName, setTheUserName] = useState(null);

  return (
    <>
      <form
        onSubmit={event => {
          event.preventDefault();
          setTTT({
            ...TTT,
            username: theUserName,
            stage: "findaplayer"
          });
          ws.send(
            JSON.stringify({
              object: "enterArena",
              username: theUserName
            })
          );
          setInstruction("click on a playername to challenge him");
        }}
      >
        <input
          type="text"
          placeholder="type here"
          onChange={event => {
            event.preventDefault();
            setTheUserName(event.target.value);
          }}
        ></input>
      </form>
    </>
  );
};
export default Connexion;
