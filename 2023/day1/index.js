import fs from "fs";

const lines = fs.readFileSync("./test-2.txt", "utf-8").split("\n");

const convertedLines = lines.map((i) =>
  i
    .replace(/eightwo/g, "82")
    .replace(/twone/g, "21")
    .replace(/nineight/g, "98")
    .replace(/threeight/g, "38")
    .replace(/sevenine/g, "79")
    .replace(/oneight/g, "18")
    .replace(/fiveight/g, "58")
    .replace(/oneight/g, "18")
    .replace(/one/g, "1")
    .replace(/two/g, "2")
    .replace(/three/g, "3")
    .replace(/four/g, "4")
    .replace(/five/g, "5")
    .replace(/six/g, "6")
    .replace(/seven/g, "7")
    .replace(/eight/g, "8")
    .replace(/nine/g, "9")
    .replace(/zero/g, "0")
);

const results = convertedLines.map((i) => {
  const firstNum = i.split("").find((i) => i < "a");
  const lastNum = i.split("").findLast((i) => i < "a");

  return parseInt(firstNum + lastNum);
});

const total = results.reduce((t, i) => t + i);

console.log(total);
