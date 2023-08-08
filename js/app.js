class DiceRoller {
  constructor() {
    this.diceValues = [3, 2, 4, 5];
    this.rolls = Array.from({length: 6}, () => this.createBlankRoll());
    this.rollContainer = document.getElementById("inputs");
    this.rollsListElement = document.getElementById("results");
    this.dice = new Dice(this.diceValues);
    this.isAnimating = false;

    this.initUI();
    this.display();
  }

  initUI() {
    this.submitButton = this.createButton("Submit", this.onSubmit.bind(this));
    this.randomizeButton = this.createButton(
      "Randomize",
      this.randomize.bind(this)
    );
    document.body.append(this.submitButton, this.randomizeButton);
  }

  createButton(text, onClick) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", onClick);
    return button;
  }

  createBlankRoll() {
    return {
      score: 0,
      modifier: 0,
      highestValues: [0, 0, 0],
      diceValues: [0, 0, 0, 0],
    };
  }

  performCalculations() {
    const sortedUniqueDiceValues = [...new Set(this.diceValues)].sort(
      (a, b) => b - a
    );
    const highestDiceValues = sortedUniqueDiceValues.slice(0, 3);
    const sum = highestDiceValues.reduce((total, value) => total + value, 0);
    const modifier = Math.floor((sum - 10) / 2);
    return {highestDiceValues, sum, modifier};
  }

  onSubmit() {
    const {highestDiceValues, sum, modifier} = this.performCalculations();
    const newRoll = {
      score: sum,
      modifier,
      highestValues: highestDiceValues,
      diceValues: this.diceValues,
    };
    const nextBlankRollIndex = this.rolls.findIndex((roll) => roll.score === 0);
    this.rolls[nextBlankRollIndex] = newRoll;
    this.display();
    this.animate(1000);
  }

  animate(timeout) {
    if (!this.isAnimating) {
      this.isAnimating = true;
      this.dice.updateIsAnimating(true);

      setTimeout(() => {
        this.isAnimating = false;
        this.dice.updateIsAnimating(false);
        this.displayDiceList(); // Refresh dice display after animation
      }, timeout);

      // Add 'roll' class to dice for animation
      const diceElements = document.querySelectorAll(".die");
      diceElements.forEach((diceElement) => diceElement.classList.add("roll"));
    }
  }

  randomize() {
    this.diceValues = this.diceValues.map(
      () => Math.floor(Math.random() * 6) + 1
    );
    this.displayDiceList();
  }

  display() {
    this.displayRolls();
    this.displayDiceList();
  }

  displayRolls() {
    this.rollContainer.innerHTML = this.rolls
      .map(
        (roll) =>
          `Score: ${roll.score} | Modifier: ${
            roll.modifier
          } Highest Dice Values: ${roll.highestValues.join(
            " "
          )} All Dice Values: ${roll.diceValues.join(" ")}`
      )
      .join("<br>");
  }

  displayDiceList() {
    this.rollsListElement.innerHTML = "";
    document.getElementById("dice").innerHTML = "";
    this.dice.render();
    this.diceValues.forEach((diceValue, index) => {
      const listItem = document.createElement("li");
      const displayValue =
        isNaN(diceValue) || diceValue < 1 || diceValue > 6
          ? "Invalid Input"
          : diceValue;
      listItem.textContent = `Dice ${index + 1}: ${displayValue}`;
      const input = this.createDiceInput(diceValue, index);
      listItem.appendChild(input);
      this.rollsListElement.appendChild(listItem);
    });
  }

  createDiceInput(diceValue, index) {
    const input = document.createElement("input");
    Object.assign(input, {type: "number", min: 1, max: 6, value: diceValue});
    input.addEventListener("change", (e) =>
      this.handleDiceInputChange(e, index)
    );
    return input;
  }

  handleDiceInputChange(event, index) {
    const newValue = parseInt(event.target.value);
    if (!isNaN(newValue) && newValue >= 1 && newValue <= 6) {
      this.diceValues[index] = newValue;
      this.displayDiceList();
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new DiceRoller();
});
