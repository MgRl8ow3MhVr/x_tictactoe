import React, { useEffect } from "react";

const Communicate2 = () => {
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.addEventListener("message", event => {
      console.log(event.data);
    });
  });

  return (
    <div>
      <button
        onClick={() => {
          this.ws.send("Bonjour");
        }}
      >
        Cick me
      </button>
    </div>
  );
};

export default Communicate2;
