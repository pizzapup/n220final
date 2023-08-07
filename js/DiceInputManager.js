// ------------------------------------- //
// -------- Dice Input Manager ------- //
// ------------------------------------- //
class DiceInputManager {
  constructor(diceRoller) {
    this.diceRoller = diceRoller;
    this.diceValues = [3, 2, 4, 5];
    this.rollsListElement = document.getElementById("inputs");

    this.displayDiceList();
  }

  displayDiceList() {
    this.rollsListElement.innerHTML = "";
    this.diceValues.forEach((diceValue, index) => {
      const listItem = document.createElement("li");
      const displayValue =
        isNaN(diceValue) || diceValue < 1 || diceValue > 6
          ? "Invalid Input"
          : diceValue.toString();
      listItem.textContent = `Dice ${index + 1}: ${displayValue}`;
      const input = this.createDiceInput(diceValue, index);
      listItem.appendChild(input);
      this.rollsListElement.appendChild(listItem);
    });
  }

  createDiceInput(diceValue, index) {
    const input = document.createElement("input");
    input.type = "number";
    input.min = 1;
    input.max = 6;
    input.value = diceValue;
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
