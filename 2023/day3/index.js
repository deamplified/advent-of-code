console.clear();
import fs from "fs";
// create 2d array/grid addressable by [v][h] coords
const grid = fs
  .readFileSync("./test-0.txt", "utf-8")
  .split("\n")
  .map((i) => i.split(""));
// locs of all symbols
const symbolLocs = (() => {
  const locs = [];
  for (let v = 0; v < grid.length; v++) {
    // and each col h
    for (let h = 0; h < grid[v].length; h++) {
      // char at current loc v/h
      const data = grid[v][h];
      // if char a symbol
      if (data !== "." && isNaN(data)) {
        // push loc to symbol list
        locs.push([v, h]);
      }
    }
  }
  return locs;
})();
// locs of all chars w/in range of a symbol
const validCharLocs = symbolLocs.flatMap((i) => {
  const locs = [];
  const v = i[0];
  const h = i[1];
  const checkPerim = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
    [0, -1],
    [-1, -1],
  ];
  checkPerim.forEach((j) => {
    const vMove = j[0];
    const hMove = j[1];
    if (!isNaN(grid[v + vMove][h + hMove])) {
      locs.push([v + vMove, h + hMove]);
    }
  });
  return locs;
});
/*








*/
// list of all valid numbers from og text
const validWholeNums = [];
// given loc of symbol => locs of any digits within 1 char v/h
function findWholeNums() {
  // for every line of chars
  for (let v = 0; v < grid.length; v++) {
    // start with an empty set
    const numsInLine = [];
    // check for numbers
    const str = grid[v].join("").match(/\d+/);
    // if any are found
    if (str !== null) {
      console.log("potential num found:", parseInt(...str)); // 142 (number)
      // assume it's invalid
      let vTotal = false;
      // check every character location of the number
      for (let h = str.index; h <= str[0].length; h++) {
        // against every valid location
        for (let i = 0; i < validCharLocs.length; i++) {
          // if there's a match
          if ([v, h].toString() === validCharLocs[i].toString()) {
            // mark number  valid
            vTotal = true;
          }
        }
      }
      // if any char locations were valid
      if (vTotal === true) {
        // add the number to the set
        numsInLine.push(parseInt(...str));
        console.log("valid num found:", parseInt(...str));
        console.log("valid nums so ", numsInLine);
        // and erase the chars
        // for (let h = str.index; h <= str[0].length; h++) {
        //   grid[v][h] = ".";
        // }
      }
    }
  }
}
findWholeNums();
/*








*/
print();
function print() {
  p(grid, "grid");
  p(symbolLocs, "symbolLocs");
  p(validCharLocs, "validCharLocs");

  function p(a, n) {
    console.log(`\n`);
    console.log(`${n}:`);
    console.log(a);
  }
}
