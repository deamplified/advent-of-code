import fs from "fs";

const results = fs
  .readFileSync("./test-2.txt", "utf-8")
  .split("\n")
  .map((i) => i.split(": "))
  .map((i) => i[1].split("; "))
  .map((i) => i.map((i) => i.split(", ")));

for (let games = 0; games < results.length; games++) {
  for (let pulls = 0; pulls < results[games].length; pulls++) {
    for (let counts = 0; counts < results[games][pulls].length; counts++) {
      let data = results[games][pulls][counts];
      let swap = data.split(" ");
      [swap[0], swap[1]] = [swap[1], swap[0]];
      data = swap.join(" ");
      results[games][pulls][counts] = data;
    }

    let alpha = results[games][pulls].sort();
    if (alpha.length === 2) {
      if (alpha[0].includes("blue")) {
        if (alpha[1].includes("green")) {
          alpha[2] = "red 0";
        } else if (alpha[1].includes("red")) {
          const temp = alpha[1];
          alpha[1] = "green 0";
          alpha.push(temp);
        }
      } else {
        alpha.unshift("blue 0");
      }
    } else if (alpha.length === 1) {
      if (alpha[0].includes("blue")) {
        alpha.push("green 0");
        alpha.push("red 0");
      } else if (alpha[0].includes("green")) {
        alpha.unshift("blue 0");
        alpha.push("red 0");
      } else if (alpha[0].includes("red")) {
        alpha.unshift("green 0");
        alpha.unshift("blue 0");
      }
    }
  }
}

for (let games = 0; games < results.length; games++) {
  for (let pulls = 0; pulls < results[games].length; pulls++) {
    for (let counts = 0; counts < results[games][pulls].length; counts++) {
      results[games][pulls][counts] = parseInt(
        results[games][pulls][counts]
          .replace("blue ", "")
          .replace("green ", "")
          .replace("red ", "")
      );
    }
  }
}

const gameData = {
  numberOfGames: results.length,
  numberOfTurnsInGame(game) {
    return results[game - 1].length;
  },
  maxPossibleInGame(game) {
    return Math.max(...results[game - 1].map((i) => Math.max(...i)));
  },
  maxBlueInGame(game) {
    const blues = [];
    for (let i = 0; i < this.numberOfTurnsInGame(game); i++) {
      blues.push(results[game - 1][i][0]);
    }
    return Math.max(...blues);
  },
  maxGreenInGame(game) {
    const greens = [];
    for (let i = 0; i < this.numberOfTurnsInGame(game); i++) {
      greens.push(results[game - 1][i][1]);
    }
    return Math.max(...greens);
  },
  maxRedInGame(game) {
    const reds = [];
    for (let i = 0; i < this.numberOfTurnsInGame(game); i++) {
      reds.push(results[game - 1][i][2]);
    }
    return Math.max(...reds);
  },
};

console.log("Total # of games", gameData.numberOfGames);
let validGames = 0;
let totalPower = 0;
for (let i = 1; i <= gameData.numberOfGames; i++) {
  // Part 1 constraints
  // if (
  //   gameData.maxBlueInGame(i) <= 14 &&
  //   gameData.maxGreenInGame(i) <= 13 &&
  //   gameData.maxRedInGame(i) <= 12
  // )
  validGames += i;

  let powerForGame =
    gameData.maxRedInGame(i) *
    gameData.maxGreenInGame(i) *
    gameData.maxBlueInGame(i);

  totalPower += powerForGame;
  console.log("\nGame", i);
  console.log("Max blue:", gameData.maxBlueInGame(i));
  console.log("Max green:", gameData.maxGreenInGame(i));
  console.log("Max red:", gameData.maxRedInGame(i));
  console.log("Power for game:", powerForGame);
  console.log(`Power sum: ${totalPower}`);
  console.log(`Valid game sum: ${validGames}`);
}
