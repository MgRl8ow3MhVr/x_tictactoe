import React, { useState, useEffect } from "react";

const TypeMe = ({ aText }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    const displayLetters = (aString, pos) => {
      setTimeout(() => {
        if (pos < aString.length) {
          setText(aString.slice(0, pos + 1));
          displayLetters(aString, pos + 1);
        }
      }, 40);
    };
    displayLetters(aText, 0);
  }, [aText]);

  return <>{text}</>;
};

export default TypeMe;
