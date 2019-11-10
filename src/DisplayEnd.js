import React, { useState } from "react";

const displayEnd = (win, reset) => {
  if (win) {
    return (
      <div>
        <h1> WINNER ! !</h1>
        <button className="end" onClick={reset}>
          reset board ?
        </button>
      </div>
    );
  }
  return null;
};

export default displayEnd;
