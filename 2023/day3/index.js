console.clear();
import fs from "fs";

const grid = fs
  .readFileSync("./test-2.txt", "utf-8")
  .split("\n")
  .map((i) => i.split(""));

const validSymbolLocs = (() => {
  const locs = [];
  for (let v = 0; v < grid.length; v++) {
    for (let h = 0; h < grid[v].length; h++) {
      const char = grid[v][h];

      if (char !== "." && isNaN(char)) {
        locs.push([v, h]);
      }
    }
  }
  return locs;
})();

const validDigitLocs = validSymbolLocs.flatMap((i) => {
  const locs = [];
  const v = i[0];
  const h = i[1];
  const checkPerim = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
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

const validNums = (() => {
  const nums = [];
  for (let v = 0; v < grid.length; v++) {
    let str = [...grid[v].join("").matchAll(/\d+/g)];
    if (str.length > 0) {
      for (let s = 0; s < str.length; s++) {
        let isValid = false;
        for (let h = str[s].index; h < str[s].index + str[s][0].length; h++) {
          for (let i = 0; i < validDigitLocs.length; i++) {
            if ([v, h].toString() === validDigitLocs[i].toString()) {
              isValid = true;
            }
          }
        }
        if (isValid === true) {
          nums.push(parseInt(str[s][0]));
        }
      }
    }
  }
  return nums;
})();

const sumOfNums = validNums.reduce((t, c) => t + c);
/*

`






*/
print();
function print() {
  p(grid, "grid");
  p(validSymbolLocs, "validSymbolLocs");
  p(validDigitLocs, "validDigitLocs");
  p(validNums, "validNums");
  p(sumOfNums, "sumOfNums");

  function p(a, n) {
    console.log(`\n`);
    console.log(`${n}:`);
    console.log(a);
  }
}
