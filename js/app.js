// App.js

// The getElements function returns an object containing references to the elements we'll be using in the application.
function getElements() {
  return {
    outputContainer: document.getElementById("results"),
    inputsContainer: document.getElementById("inputs"),
    messageContainer: document.getElementById("message"),
    buttonsContainer: document.getElementById("buttons"),
    template: document.getElementById("template"),
    randomButton: document.getElementById("randomButton"),
    submitButton: document.getElementById("submitButton"),
    inputs: document.querySelectorAll("input"),
    inputsList: document.createElement("ul"),
  };
}

// The App class is the main class for the application. It handles the creation of the dice, the template, and the event listeners. It also handles the logic for updating the dice, rolling the dice, and displaying the results.
class App {
  // The constructor method is called when a new instance of the App class is created. It initializes the elements, values, template, and dice properties. It also calls the attachEventListeners method and the renderInputs method.
  constructor() {
    this.elements = getElements(); // Get references to the elements we'll be using in the application.
    this.values = [3, 2, 4, 5]; // The values array stores the 4d6 values.
    this.template = new Template(); // Create a new template.
    this.dice = new Dice(this.values); // Create a new dice instance.

    this.rolls = Array(6).fill({
      score: 0,
      modifier: 0,
      highestValues: [0, 0, 0],
      values: [0, 0, 0, 0],
    }); // The rolls array stores the results of each roll.

    this.displayScores = this.displayScores.bind(this); // Bind the displayScores method to the App instance so it can be used as a callback.
    this.attachEventListeners(); // Attach event listeners to the random button, submit button, and inputs.
    this.renderInputs(); // Render the inputs
    this.displayScores(); // Display the scores.
  }

  // attachEventListeners method attaches event listeners to the random button, submit button, and inputs.
  attachEventListeners() {
    this.elements.randomButton.addEventListener("click", () =>
      this.randomize()
    );
    this.elements.submitButton.addEventListener("click", () =>
      this.handleSubmit()
    );

    this.elements.inputs.forEach((input, index) => {
      input.addEventListener("change", (e) => this.handleInputChange(e, index));
    });
  }

  renderInputs() {
    // Render the inputs.
    this.elements.inputsContainer.appendChild(this.elements.inputsList);
    for (let i = 0; i < 4; i++) {
      // Create a list item with an input field and append it to the inputs list.
      const listItem = this.createListItem(i);
      this.elements.inputsList.appendChild(listItem);
    }

    // Update the message text
    this.elements.messageContainer.textContent = "Enter your dice values";
  }

  // The createListItem method creates a list item with an input field.
  createListItem(index) {
    // Create the list item, label, and input elements
    const [listItem, label, label2] = [
      document.createElement("li"),
      document.createElement("div"),
      document.createElement("div"),
    ];

    // Create the input field
    const input = this.createInputField(index);

    // Set the attributes and text content for the list item elements
    label.textContent = `Dice #${index + 1}`;
    label2.id = `li-${index}`;
    label2.textContent = `${this.values[index]}`;

    // Append the elements to the list item
    listItem.append(label2, label, input);
    return listItem;
  }

  // The createInputField method creates an input field with the given index.
  createInputField(index) {
    const input = document.createElement("input");
    input.type = "number";
    input.min = 1;
    input.max = 6;
    input.id = `input-${index}`; // Set the id to the given index.
    input.placeholder = `${this.values[index]}`; // Set the placeholder to the value at the given index.
    return input;
  }

  // The handleInputChange method handles the input change event. It updates the values array and calls the updateListItem method.
  handleInputChange(event, index) {
    const value = Number(event.target.value); // Get the value from the input field and convert it to a number so we can check if it's a valid input.

    // Check if the value is a number between 1 and 6.
    if (!isNaN(value) && value >= 1 && value <= 6) {
      // If the value is valid, update the values array and call the updateListItem method.
      this.values[index] = value;
      this.updateListItem(index, value);
    } else {
      // If the value is invalid, log an error message to the console.
      console.log("Invalid input");
    }
  }

  // The updateListItem method updates the list item with the given index to display the given value.
  updateListItem(index, value) {
    // Get the list item and input field with the given index.
    const listItem = document.getElementById(`li-${index}`);
    // Update the text content and placeholder for the list item and input field.
    listItem.textContent = value;
    const input = document.getElementById(`input-${index}`);
    input.placeholder = value;
  }

  // The randomize method randomizes the values array and calls the updateListItem method for each list item.
  randomize() {
    // Randomize the values array and call the updateListItem method for each list item.
    this.values = Array.from(
      {length: 4},
      () => Math.floor(Math.random() * 6) + 1
    ); // Create a new array with 4 random values between 1 and 6.

    this.values.forEach((value, i) => this.updateListItem(i, value)); // Call the updateListItem method for each value in the values array.

    this.dice.roll(this.values); // Roll the dice with the new values by calling the roll method on the dice instance.

    this.elements.messageContainer.textContent =
      "Dice rolled!! (values randomized)"; // Update the message text.
  }

  // The handleSubmit method handles the submit event. It calculates the scores, updates the rolls array, and calls the displayScores method.
  handleSubmit() {
    // Calculate the scores, update the rolls array, and call the displayScores method using destructuring.
    const {highestValues, sum, modifier} = this.calculateScores();

    // Create a new roll object with the scores and values.
    const newRoll = {score: sum, modifier, highestValues, values: this.values};

    const blankIndex = this.rolls.findIndex((entry) => entry.score === 0); // Find the index of the first roll object with a score of 0.

    this.rolls[blankIndex] = newRoll; // Update the roll object at the given index with the new roll object.

    this.displayScores(); // Call the displayScores method to update the output.

    this.dice.roll(this.values);
    this.elements.messageContainer.textContent = "Values submitted";
  }

  // The calculateScores method calculates the scores and returns an object with the highest values, sum, and modifier.
  calculateScores() {
    // Sort the values array in descending order and get the first 3 values.
    const sortedValues = this.values.slice().sort((a, b) => b - a);
    const highestValues = sortedValues.slice(0, 3);

    // Calculate the sum and modifier.
    const sum = highestValues.reduce((total, value) => total + value, 0);

    // Calculate the modifier by subtracting 10 from the sum and dividing by 2, rounded down.
    const modifier = Math.floor((sum - 10) / 2);

    return {highestValues, sum, modifier};
  }

  // The displayScores method displays the scores in the output container.
  displayScores() {
    // Clear the output container so we can populate it with new elements.
    this.elements.outputContainer.innerHTML = "";

    // Loop through the rolls array and create an element for each roll object.
    this.rolls.forEach((roll, index) => {
      // Check if the score is 0. If it is, return so we don't display it.
      if (roll.score === 0) return;

      // Create an element for the roll object and append it to the output container.
      const itemElement = this.template.populateTemplate(
        roll,
        index,
        this.elements.template
      );

      // Append the item element to the output container.
      this.elements.outputContainer.appendChild(itemElement);
    });
  }
}

// Initialize the App
document.addEventListener("DOMContentLoaded", () => new App());
