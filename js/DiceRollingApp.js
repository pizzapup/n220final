// ------------------------------------- //
// -------- Dice Rolling App ------- //
// ------------------------------------- //
class DiceRollingApp {
  constructor() {
    this.rollManager = new ScoreCalculator();
    this.uiManager = new UIManager(this);
    this.diceInputManager = new DiceInputManager(this);
    this.uiManager.displayRolls(); // Display rolls on page load
    this.updateMessage(); // Update the message on page load
  }

  updateMessage() {
    if (this.rollCount >= this.maxRolls) {
      this.uiManager.displayMessage("Maximum rolls reached.");
    } else {
      this.uiManager.displayMessage(""); // Clear the message
    }
  }

  onSubmit() {
    const {highestDiceValues, sum, modifier} =
      this.rollManager.performCalculations(this.diceInputManager.diceValues);
    const newRoll = {
      score: sum,
      modifier,
      highestValues: highestDiceValues,
      diceValues: this.diceInputManager.diceValues,
    };

    const nextBlankRollIndex = this.rollManager.rolls.findIndex(
      (roll) => roll.score === 0
    );
    this.rollManager.updateRoll(nextBlankRollIndex, newRoll);

    this.uiManager.displayRolls();
  }

  randomize() {
    this.diceInputManager.diceValues = this.diceInputManager.diceValues.map(
      () => Math.floor(Math.random() * 6) + 1
    );
    this.diceInputManager.displayDiceList();
  }
}
