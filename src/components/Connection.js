const Connection = setWs => {
  // this.ws = new WebSocket("wss://backendtictactoe.herokuapp.com/");
  const ws = new WebSocket("ws://localhost:8080");

  ws.addEventListener("message", event => {
    const response = JSON.parse(event.data);
    switch (response.object) {
      case "newUser":
        console.log("newuser", response.playersList);
        setPlayersList(response.playersList);
        break;
      case "challenged":
        setGameStarted(true);
        alert(`you be been challenged by ${response.by}. You START`);
        props.setTTT({
          ...props.TTT,
          opponent: response.by,
          allowedToPlay: true,
          player: "X"
        });
        break;
      default:
        const TTTcopy = { ...props.TTT };
        TTTcopy.lastPlayed = [null, null];
        TTTcopy.allowedToPlay = true;
        TTTcopy.grid = response.grid;
        TTTcopy.scoreX = response.scoreX;
        TTTcopy.scoreO = response.scoreO;
        props.setTTT(TTTcopy);
        break;
    }
  });
  setWs(ws);
};

export default Connection;
