import React, { useState } from "react";

const DisplayReset = props => {
  const { win, reset } = props;
  const [params, setParams] = useState({ size: 12, victory: 4 });
  return (
    <div className="reset">
      <h1>Reset Board</h1>
      <form
        onSubmit={event => {
          // alert(params.size);
          // alert(params.victory);
          event.preventDefault();

          if (params.size > 1 && params.victory <= params.size) {
            reset(params);
          } else {
            alert("minimum size is 2 && victory must be inferior to size");
          }
        }}
      >
        <h2>Matrix Size</h2>

        <input
          type="text"
          placeholder="how many rows"
          value={params.size}
          onChange={event => {
            event.preventDefault();
            if (!isNaN(Number(event.target.value))) {
              setParams({
                size:
                  event.target.value !== "" ? Number(event.target.value) : "",
                victory: params.victory
              });
            }
          }}
        ></input>
        <h2>Victory align</h2>

        <input
          type="text"
          placeholder="Number of aligment for Victory"
          value={params.victory}
          onChange={event => {
            event.preventDefault();
            if (!isNaN(Number(event.target.value))) {
              setParams({
                size: params.size,
                victory:
                  event.target.value !== "" ? Number(event.target.value) : ""
              });
            }
          }}
        ></input>
        <h2></h2>

        <input type="submit" value="New Game"></input>
      </form>
    </div>
  );
};

export default DisplayReset;
