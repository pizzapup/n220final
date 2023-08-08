class Dice {
  constructor(diceValues = [6, 5, 4, 3], isAnimating = false) {
    this.diceValues = diceValues;
    this.isAnimating = isAnimating;
    this.dotsOrders = {
      1: [0, 0, 0, 0, 1, 0, 0, 0, 0],
      2: [0, 0, 1, 0, 0, 0, 1, 0, 0],
      3: [0, 0, 1, 0, 1, 0, 1, 0, 0],
      4: [1, 0, 1, 0, 0, 0, 1, 0, 1],
      5: [1, 0, 1, 0, 1, 0, 1, 0, 1],
      6: [1, 1, 1, 0, 0, 0, 1, 1, 1],
    };
  }

  updateIsAnimating(value) {
    this.isAnimating = value;
  }

  render() {
    const diceContainer = document.getElementById("dice");
    diceContainer.className = "dice";
    diceContainer.innerHTML = "";

    this.diceValues.forEach((dieValue) => {
      const dieElement = document.createElement("div");
      dieElement.className = `die ${this.isAnimating ? "roll" : ""}`;

      if (dieValue <= 6 && dieValue >= 1) {
        this.dotsOrders[dieValue].forEach((dot) => {
          const dotElement = document.createElement("div");
          dotElement.className = dot === 1 ? "dot" : "";
          dieElement.appendChild(dotElement);
        });
      } else {
        this.dotsOrders[1].forEach((dot) => {
          const dotElement = document.createElement("div");
          dotElement.className = dot === 1 ? "dot" : "";
          dieElement.appendChild(dotElement);
        });
      }

      diceContainer.appendChild(dieElement);
    });
  }
}
