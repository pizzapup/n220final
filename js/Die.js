// Die.js

// The Die class handles the creation of each individual die and creating/updating their dot patterns.

// The patterns object maps each value to a dot pattern.
const patterns = {
  1: [0, 0, 0, 0, 1, 0, 0, 0, 0],
  2: [0, 0, 1, 0, 0, 0, 1, 0, 0],
  3: [0, 0, 1, 0, 1, 0, 1, 0, 0],
  4: [1, 0, 1, 0, 0, 0, 1, 0, 1],
  5: [1, 0, 1, 0, 1, 0, 1, 0, 1],
  6: [1, 1, 1, 0, 0, 0, 1, 1, 1],
};

class Die {
  constructor(parentIndex, values = [1, 2, 3, 4]) {
    this.parentIndex = parentIndex; // The index of the die in the dice array.
    this.values = values; // Array of values representing the 4d6 values passed to each die.
    this.newDie = this.createDie(); // Create a new die.
  }

  // The updateDotPattern method updates the dot pattern for a given die based on the provided value.
  updateDotPattern(value) {
    const dotPattern = patterns[value]; // Get the dot pattern for the provided value.

    // Update the dot pattern for the die.
    dotPattern.forEach((filled, index) => {
      // Get the dot element for the given index
      const dot = document.getElementById(
        `die-${this.parentIndex}-dot-${index}`
      );

      // If the dot pattern value is 1, add the "dot" class to the dot element. Otherwise, remove the "dot" class.
      dot.className = filled ? "dot" : "";
    });
  }

  // The initDotGrid method creates the dot grid for a given die.
  initDotGrid(die) {
    // Create 9 dot elements for the dot grid.
    for (let i = 0; i < 9; i++) {
      // Create a new dot element.
      const dot = document.createElement("div");

      // Attach an id to the dot element to make it easier to update the dot pattern later
      dot.id = `die-${this.parentIndex}-dot-${i}`;

      // Append the dot element to the die.
      die.appendChild(dot);
    }
  }

  // The createDie method creates a new die.
  createDie() {
    // Create a new die element.
    const die = document.createElement("div");

    // Add the "die" class to the die element.
    die.className = "die";

    // Initialize the dot grid for the die.
    this.initDotGrid(die);

    // Return the new die.
    return die;
  }
}
