const thegrid = size => {
  let tab = [];
  for (let i = 0; i < size; i++) {
    let subtab = [];
    for (let j = 0; j < size; j++) {
      subtab.push(-10);
    }
    tab.push(subtab);
  }
  return tab;
};

export default thegrid;
