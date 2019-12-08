//test
import React from "react";

class Communicate extends React.Component {
  state = {
    playersList: [],
    username: null,
    connected: false,
    gamestarted: false
  };

  componentDidMount() {
    // this.ws = new WebSocket("wss://backendtictactoe.herokuapp.com/");
    this.ws = new WebSocket("ws://localhost:8080");
    this.ws.addEventListener("message", event => {
      const response = JSON.parse(event.data);
      switch (response.object) {
        case "newUser":
          console.log("newuser", response.playersList);
          this.setState({
            playersList: response.playersList
          });
          break;
        case "challenged":
          this.setState({ gamestarted: true });
          alert(`you be been challenged by ${response.by}. You START`);
          this.props.setTTT({
            ...this.props.TTT,
            opponent: response.by,
            allowedToPlay: true,
            player: "X"
          });
          break;

        default:
          const TTTcopy = { ...this.props.TTT };
          TTTcopy.lastPlayed = [null, null];
          TTTcopy.allowedToPlay = true;
          TTTcopy.grid = response.grid;
          TTTcopy.scoreX = response.scoreX;
          TTTcopy.scoreO = response.scoreO;
          this.props.setTTT(TTTcopy);
          break;
      }
    });
    this.sendGame = TTT => {
      this.ws.send(JSON.stringify(TTT));
    };
  }

  render() {
    return (
      <>
        <div className="starter">
          {/* # # # # # # Players List # # # # #  */}
          {!this.state.gamestarted && (
            <div className="playerslist">
              {this.state.playersList &&
                this.state.playersList.map((player, index) => {
                  if (player !== this.state.username) {
                    return (
                      <h4
                        key={index}
                        onClick={() => {
                          this.props.setTTT({
                            ...this.props.TTT,
                            opponent: player,
                            player: "O"
                          });
                          this.setState({ gamestarted: true });

                          this.ws.send(
                            JSON.stringify({
                              object: "challenge",
                              challenger: this.state.username,
                              opponent: player
                            })
                          );
                          alert(
                            `You challenged ${player}. "He is X, you are O, wait that he plays first"`
                          );
                        }}
                      >
                        {player}
                      </h4>
                    );
                  } else {
                    return null;
                  }
                })}
            </div>
          )}
          {/* # # # # # # CONNEXION # # # # #  */}
          {!this.state.connected && (
            <>
              <form
                onSubmit={event => {
                  event.preventDefault();
                  this.setState({ connected: true });
                  this.props.setTTT({
                    ...this.props.TTT,
                    username: this.state.username
                  });
                  this.ws.send(
                    JSON.stringify({
                      object: "enterArena",
                      username: this.state.username
                    })
                  );
                }}
              >
                <h2>Enter your own UserName to find other connected players</h2>
                <h2>
                  Then clic on a player name to start a game against him || OR
                  || wait that someone invites you
                </h2>

                <input
                  type="text"
                  onChange={event => {
                    event.preventDefault();
                    this.setState({ username: event.target.value });
                  }}
                ></input>

                <input type="submit" value="find players"></input>
              </form>
            </>
          )}
        </div>

        {/* # # # # # # ENVOYER LE JEU # # # # #  */}
        <button
          onClick={() => {
            this.ws.send(JSON.stringify(this.props.TTT));
          }}
        >
          SEND
        </button>
      </>
    );
  }
}
export default Communicate;
