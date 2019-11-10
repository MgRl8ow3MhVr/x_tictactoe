import React from "react";
import OneBox from "./OneBox";

const OneLine = props => {
  const { TTT, setTTT, size, line } = props;

  let tab = [];
  for (let i = 0; i < size; i++) {
    tab.push(<OneBox TTT={TTT} setTTT={setTTT} r={line} c={i}></OneBox>);
  }

  return <section>{tab}</section>;
};

const CreateGrid = props => {
  const { TTT, setTTT, size } = props;
  let tab = [];
  for (let i = 0; i < size; i++) {
    tab.push(
      <OneLine TTT={TTT} setTTT={setTTT} size={size} line={i}></OneLine>
    );
  }
  return tab;
};

export default CreateGrid;
