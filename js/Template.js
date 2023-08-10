// Template.js

// The Template class handles the creation of the list items for each roll and populates the template with the appropriate data.

class Template {
  // The generateList method accepts an array of values, an array of highest values, and a parent element. It sorts the values array, generates list items for each value, and appends them to the parent element.
  generateList(list, list2, parent) {
    // Sort the values array in descending order.
    list.sort((a, b) => b - a);

    // Loop through the values array and create a list item for each value.
    list.forEach((item, i) => {
      const li = document.createElement("li");
      li.textContent = item;
      li.classList.add("li-result");

      // Add the "highlight" class to the list item if the value is included in the highest values array.
      if (list2.includes(item)) {
        li.classList.add("highlight");
      }

      // Add the "duplicate" class to the list item if the value is the same as the previous value.
      if (i === list.length - 1 && list[i] === list[i - 1]) {
        li.classList.add("duplicate");
      }

      parent.appendChild(li);
    });
  }

  // The populateTemplate method accepts an object representing a roll, the index of the roll, and a template element. It populates the template with the appropriate data and returns the populated template.
  populateTemplate(item, index, template) {
    // Clone the template element.
    const clone = template.content.cloneNode(true);

    // Populate the template with the appropriate data.
    clone.querySelector(".roll-count").textContent = index;
    clone.querySelector(".modifier").textContent = item.modifier;
    clone.querySelector(".score").textContent = item.score;

    // Generate the list of values for the roll.
    this.generateList(
      item.values,
      item.highestValues,
      clone.querySelector(".result-list")
    );

    return clone;
  }
}
