import React, { useState } from "react";

const Connexion = ({ TTT, setTTT, ws }) => {
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
        }}
      >
        <input
          type="text"
          onChange={event => {
            event.preventDefault();
            setTheUserName(event.target.value);
          }}
        ></input>

        {/* <input type="submit" value="find players"></input> */}
      </form>
    </>
  );
};
export default Connexion;
