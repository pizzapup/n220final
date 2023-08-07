// ------------------------------------- //
// -------- Message Manager Class ------- //
// ------------------------------------- //

class MessageManager {
  constructor() {
    this.buttonsElement = document.getElementById("buttons");
    this.messageElement = document.createElement("div");
    this.messageElement.id = "message";
    this.messageElement.classList.add("message");
    document.body.appendChild(this.messageElement);
  }

  displayMessage(message) {
    this.messageElement.textContent = message;
  }
}

// ------------------------------------- //
// -------- UI Manager Class ----------- //
// ------------------------------------- //

class UIManager {
  constructor(DiceRollingApp) {
    this.diceRoller = DiceRollingApp;
    this.rollContainer = document.getElementById("results");
    this.rollsListElement = document.getElementById("rolls-list");
    this.submitButton = this.createButton("Submit");
    this.randomizeButton = this.createButton("Randomize");

    this.messageManager = new MessageManager();

    this.displayMessage(""); // Display an empty message initially

    this.initializeUI();
  }

  initializeUI() {
    this.setupEventListeners();
    buttons.append(this.submitButton, this.randomizeButton);
  }

  displayMessage(message) {
    this.messageManager.displayMessage(message);
  }
  setupEventListeners() {
    this.submitButton.addEventListener("click", () =>
      this.diceRoller.onSubmit()
    );
    this.randomizeButton.addEventListener("click", () =>
      this.diceRoller.randomize()
    );
  }

  createButton(text) {
    const button = document.createElement("button");
    button.textContent = text;
    button.classList.add("ui-button");
    return button;
  }

  displayRolls() {
    this.rollContainer.innerHTML = "";
    this.diceRoller.rollManager.rolls.forEach((roll) => {
      const {score, modifier, highestValues, diceValues} = roll;
      const listItem = document.createElement("li");
      listItem.textContent = `Score: ${score} | Modifier: ${modifier} Highest Dice Values: ${highestValues.join(
        " "
      )} All Dice Values: ${diceValues.join(" ")}`;
      listItem.classList.add("result-item");
      this.rollContainer.appendChild(listItem);
    });
  }
}
