const vegetarian = "Vegetarian Pizza";
const hawaiian = "Hawaiian Pizza";
const pepperoni = "Pepperoni Pizza";

const pizzaPrice = 80;
// deklarera orderName utanför loopen så att den inte fortsätter loopa även om man skriver rätt.

// Array med antal pizzor respektive tid.
const cookingTimes = [
  { pizzas: 1, time: 10 },
  { pizzas: 3, time: 15 },
  { pizzas: 6, time: 20 },
];

const menuItems = [vegetarian, hawaiian, pepperoni];

// .some är en array metod som kontrollerar om det användaren skriver in matchar nåt i menuItems.
function checkOrderName(name) {
  return menuItems.some((menuItem) =>
    menuItem.toLowerCase().includes(name.toLowerCase())
  );
}

// Denna rad väntar så hela html filen har laddats in, och då körs funktionen.
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("pizzaForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      submitOrder();
    });
});

function submitOrder() {
  let orderName;
  const pizzaType = document.getElementById("pizzaType").value;
  const quantity = document.getElementById("quantity").value;

  if (validateOrder(pizzaType)) {
    orderName = pizzaType;
    const result = `Yes sir! That will be ${totalCost(quantity)} kr, and will be ready in ${cookingTime(
      quantity
    )} minutes.`;
    document.getElementById("resultSection").innerHTML = `<p>${result}</p>`;
  } else {
    alert(
      "Sorry, that one is not on the menu. Please pick a pizza from the menu."
    );
  }
}

// Funktion som kollar om något av det användaren skriver in matchar något av det på menyn.
function validateOrder(order) {
  return menuItems.some((menuItem) =>
    menuItem.toLowerCase().includes(order.toLowerCase())
  );
}

// Funktion som beräknar den totala summan genom att multiplicera antal pizzor med pris.
function totalCost(quantity) {
  return quantity * pizzaPrice;
}

// Arrow function som beräknar tiden.
function cookingTime(quantity) {
  const cookingTimeRule =
    cookingTimes.find((rule) => quantity <= rule.pizzas) ||
    cookingTimes[cookingTimes.length - 1];
  return cookingTimeRule.time;
}
