// ------------------------------------- //
// --------  Score Calculator ---------- //
// ------------------------------------- //
let blankRoll = {
  score: 0,
  modifier: 0,
  highestValues: [0, 0, 0],
  diceValues: [0, 0, 0, 0],
};
class ScoreCalculator {
  constructor() {
    this.rolls = Array.from({length: 6}, () => blankRoll);
  }

  updateRoll(index, roll) {
    this.rolls[index] = roll;
  }

  performCalculations(diceValues) {
    const sortedUniqueDiceValues = [...new Set(diceValues)].sort(
      (a, b) => b - a
    );
    const highestDiceValues = sortedUniqueDiceValues.slice(0, 3);
    const sum = highestDiceValues.reduce((total, value) => total + value, 0);
    const modifier = Math.floor((sum - 10) / 2);
    return {highestDiceValues, sum, modifier};
  }
}
