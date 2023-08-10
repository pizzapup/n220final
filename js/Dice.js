// Dice.js

// The Dice class handles the creation of dice, updating their dot patterns during rolls, and managing animation states.

class Dice {
  // Constructor accepts an array of values representing the "scores" of each die.
  constructor(values = [6, 5, 4, 3]) {
    this.diceContainer = document.getElementById("dice"); // The container for rendering dice.
    this.values = values; // Array of values representing the 4d6 values passed to each die.
    this.dice = []; // Array to hold Die instances.
    this.initDice(); // Initialize the dice.
  }

  // The roll method updates dot patterns for each die based on provided values and triggers animation.
  roll(values) {
    this.dice.forEach((die, index) => {
      die.updateDotPattern(values[index]); // Update dot pattern for each die.
      die.newDie.className = "die roll"; // Add "roll" class to trigger animation.
      setTimeout(() => {
        die.newDie.className = "die"; // Remove "roll" class after 1 second to reset animation.
      }, 1000);
    });
  }

  // The initDice method creates Die instances for each value, appends them to the container, and initializes dot patterns.
  initDice() {
    // Create Die instances for each of the 4 dice.
    for (let i = 1; i < 5; i++) {
      const die = new Die(i); // Create a new Die instance.
      this.dice.push(die); // Store the new die in the dice array.
      this.diceContainer.appendChild(die.newDie); // Append die to the container.
      // Initialize dot patterns for each die.
      this.dice.forEach((die, index) => {
        die.updateDotPattern(this.values[index]);
      });
    }
  }
}
