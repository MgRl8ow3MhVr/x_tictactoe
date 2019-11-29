import React from "react";

class Communicate extends React.Component {
  componentDidMount() {
    this.ws = new WebSocket("ws://localhost:8080");
    this.ws.addEventListener("message", event => {
      const response = JSON.parse(event.data);
      console.log(response.player);
      this.props.setTTT(response);
      // console.log(event.data.grid);
    });
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.ws.send(JSON.stringify(this.props.TTT));
          }}
        >
          Cick me
        </button>
      </div>
    );
  }
}

export default Communicate;
