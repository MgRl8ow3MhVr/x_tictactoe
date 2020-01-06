const displayLetters = (aString, pos) => {
  setTimeout(() => {
    if (pos < aString.length) {
      console.log(aString.slice(0, pos + 1));
      displayLetters(aString, pos + 1);
    }
  }, 500);
};
displayLetters("test", 0);
