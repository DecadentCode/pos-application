"use strict";

const cartSection = document.querySelector(".cart-section");
const cartCounter = document.querySelector(".cart-counter");
const ticketSection = document.querySelector(".tickets-section");
const ticketContainers = document.querySelectorAll(".ticket-container");
const clothingList = document.querySelector(".clothing-list");
const collectablesList = document.querySelector(".collectables-list");
const cartContainer = document.querySelector(".cart-container");
const cartBox = document.querySelector(".cart-box");
const cartList = document.querySelector(".cart-list");
const clothesSection = document.querySelector(".clothes-section");
const collectablesSection = document.querySelector(".collectables-section");
const checkoutContainer = document.querySelector(".checkout-container");
const checkoutButtonCash = document.querySelector(".checkout-cash-button");
const checkoutButtonCredit = document.querySelector(".checkout-credit-button");
let subtotalCost = 0;
let salesTax = 0;

const findTotalCost = () => {
  let totalCost = subtotalCost + salesTax;
  return totalCost.toFixed(2);
};

// ---- ARRAYS ----
const cartArray = [];

const ticketsArray = [
  {
    name: "General Admission",
    category: "ticket",
    price: 40,
    picture: "Assets/ticket1.png",
  },
  {
    name: "Medium Admission",
    category: "ticket",
    price: 100,
    picture: "Assets/ticket2.png",
  },
  {
    name: "Grande Admission",
    category: "ticket",
    price: 10000,
    picture: "Assets/ticket3.png",
  },
];

const clothesArray = [
  {
    name: "Hoodie",
    category: "clothes",
    description: "hoodie",
    price: 30,
    picture: "assets/hoodie.png",
  },
  {
    name: "Hat",
    category: "clothes",
    description: "hat",
    price: 10,
    picture: "assets/hat.png",
  },
  {
    name: "Bandana",
    category: "clothes",
    description: "bandana",
    price: 5,
    picture: "assets/bandana.png",
  },
  {
    name: "Crop Top",
    category: "clothes",
    description: "womens shirt",
    price: 25,
    picture: "assets/rick-croptop.png",
  },
  {
    name: "Mens Shirt",
    category: "clothes",
    description: "mens shirt",
    price: 99,
    picture: "assets/dudeshirt.png",
  },
  {
    name: "Dog Beanies",
    category: "clothes",
    description: "dog beanie",
    price: 15,
    picture: "assets/dogbeanie.png",
  },
];

const collectablesArray = [
  {
    name: "Keychains",
    category: "collectables",
    description: "keychain",
    price: 3,
    picture: "assets/keychain.png",
  },
  {
    name: "Mugs",
    category: "collectables",
    description: "mugs",
    price: 10,
    picture: "assets/mug.png",
  },
  {
    name: "Pins",
    category: "collectables",
    description: "pins",
    price: 8,
    picture: "assets/pins.png",
  },
  {
    name: "Magnets",
    category: "collectables",
    description: "magnets",
    price: 10,
    picture: "assets/magnets.png",
  },
];

// ---- Unhides Checkout ----
cartSection.addEventListener("click", () => {
  cartContainer.classList.remove("hide");
  cartListFunction();
});

// ---- Hides Checkout ----
cartContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("close-me")) {
    cartContainer.classList.add("hide");
  }
});

// ---- Cart Counter Function ----
const displayCartNumber = () => {
  let totalQuantity = 0;
  cartArray.forEach((item) => {
    totalQuantity += item.qty;
  });
  cartCounter.textContent = totalQuantity;
};
displayCartNumber();

// ---- Creating a Form ----
const createForm = (index, array) => {
  const form = document.createElement("form");
  const label = document.createElement("label");
  const input = document.createElement("input");
  const button = document.createElement("button");
  button.setAttribute("data-index", index);
  button.classList.add("add-to-cart");
  button.textContent = "Add to cart";
  label.setAttribute("for", "qty");
  label.textContent = "qty";
  input.setAttribute("id", `qty-${index}`);
  input.setAttribute("name", "qty");
  input.setAttribute("type", "number");
  input.setAttribute("min", 1);
  input.setAttribute("value", 1);
  let inputId = "";
  if (array === clothesArray) {
    inputId = `clothesQty-${index}`;
  } else if (array === collectablesArray) {
    inputId = `collectablesQty-${index}`;
  }
  input.setAttribute("id", inputId);
  label.setAttribute("for", inputId);
  form.append(label, input, button);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.reset();
  });
  return form;
};

// ---- Add forms to ticket containers ----
const addTicketForms = () => {
  ticketContainers.forEach((ticketContainer, index) => {
    let form = createForm(index);
    ticketContainer.append(form);
  });
};
addTicketForms();

// ---- Add products to page and forms to the product containers ----
const goodsFunction = (array, destination) => {
  array.forEach((product, index) => {
    const listItem = document.createElement("li");
    const title = document.createElement("h3");
    const image = document.createElement("img");
    const price = document.createElement("p");
    const container = document.createElement("div");
    image.setAttribute("src", product.picture);
    price.textContent = `$${product.price}`;
    listItem.classList.add("list-item");
    container.classList.add("goods-container");
    image.classList.add("goods");
    title.textContent = product.name;
    let form = createForm(index);
    container.append(image);
    container.append(form);
    listItem.append(title, container, price, form);
    destination.append(listItem);
  });
};
goodsFunction(clothesArray, clothingList);
goodsFunction(collectablesArray, collectablesList);

// ---- Adds click listeners to the "add to cart" buttons and stacks the product quantities----
const addSectionListeners = (section, array) => {
  section.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
      const qty = parseInt(e.target.previousSibling.value);
      const index = e.target.getAttribute("data-index");
      let product = array[index];
      subtotalCost += product.price * qty;
      const newItem = {
        ...product,
        qty,
      };
      if (
        !cartArray.some((item) => {
          return item.name === product.name;
        })
      ) {
        cartArray.push(newItem);
        displayCartNumber();
        console.log(cartArray);
      } else {
        let cartItemIndex = cartArray.findIndex((item) => {
          return item.name === product.name;
        });
        cartArray[cartItemIndex].qty += qty;
      }
    }
    cartListFunction();
  });
};
addSectionListeners(ticketSection, ticketsArray);
addSectionListeners(clothesSection, clothesArray);
addSectionListeners(collectablesSection, collectablesArray);

// ---- Appends a list of all the items in cartArray ----
const cartAppend = (destination) => {
  const lineBreak = document.createElement("hr");
  cartArray.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.classList.add("cart-li");
    listItem.textContent = `${item.qty} x ${item.name} $${item.price}`;
    destination.append(listItem);
  });
  destination.append(lineBreak);
};

// ---- Appends the subtotal, sales tax, and total cost ----
const costAppend = (destination) => {
  const subtotalListItem = document.createElement("li");
  const salesTaxListItem = document.createElement("li");
  const totalListItem = document.createElement("li");
  let totalCost = findTotalCost();
  salesTax = totalCost * 0.06;
  let fixedTax = salesTax.toFixed(2);
  subtotalListItem.textContent = `Subtotal: $${subtotalCost}`;
  salesTaxListItem.textContent = `Sales Tax $${fixedTax}`;
  totalListItem.textContent = `Total $${totalCost}`;
  destination.append(subtotalListItem, salesTaxListItem, totalListItem);
};

//  ---- Populates the initial checkout cart ----
const cartListFunction = () => {
  cartList.innerHTML = "";
  cartAppend(cartList);
  costAppend(cartList);
};

// ---- Takes the checkout screen to either the cash or credit checkout screens ----
cartContainer.addEventListener("click", (e) => {
  let totalCost = findTotalCost();
  const startOverButton = document.createElement("button");
  startOverButton.textContent = "Start New Order";
  if (e.target.classList.contains("checkout-cash-button")) {
    const checkoutCash = document.querySelector(".checkout-cash-screen");
    const cashForm = document.querySelector(".cash-form");
    const totalDueP = document.querySelector(".cash-form .total-due-p");
    const lineBreak = document.createElement("p");
    const notEnough = document.querySelector(".not-enough");
    cartList.classList.add("hide");
    checkoutButtonCash.classList.add("hide");
    checkoutButtonCredit.classList.add("hide");
    checkoutCash.classList.remove("hide");
    totalDueP.append(totalCost);
    cashForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const cashGiven = document.getElementById("cash-provided-id").value;
      let intTotalCost = parseInt(totalCost);
      if (cashGiven === NaN || cashGiven < intTotalCost) {
        notEnough.classList.remove("invisible");
      } else {
        const changeDue = (cashGiven - totalCost).toFixed(2);
        notEnough.classList.add("hide");
        cashForm.classList.add("hide");
        cartAppend(checkoutCash);
        costAppend(checkoutCash);
        checkoutCash.append(`You paid $${cashGiven}`);
        checkoutCash.append(lineBreak);
        checkoutCash.append(`Your change is $${changeDue}`);
        checkoutCash.append(startOverButton);
        startOverButton.addEventListener("click", () => {
          location.reload();
        });
      }
    });
  } else if (e.target.classList.contains("checkout-credit-button")) {
    const checkoutCredit = document.querySelector(".checkout-credit-screen");
    const totalDueP = document.querySelector(".credit-form .total-due-p");
    const creditForm = document.querySelector(".credit-form");
    const expired = document.querySelector(".expired");
    cartList.classList.add("hide");
    checkoutButtonCash.classList.add("hide");
    checkoutButtonCredit.classList.add("hide");
    checkoutCredit.classList.remove("hide");
    totalDueP.append(totalCost);
    creditForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let expDate = new Date(document.getElementById("credit-date-id").value);
      expDate = new Date(
        expDate.getUTCFullYear(),
        expDate.getUTCMonth(),
        expDate.getUTCDate(),
        23,
        59,
        59,
        expDate.getUTCMilliseconds()
      );
      const currentDate = new Date();
      console.log(currentDate, expDate);
      if (expDate <= currentDate) {
        expired.classList.remove("invisible");
      } else {
        creditForm.classList.add("hide");
        checkoutCredit.append(`Thank you for your payment!`);
        cartAppend(checkoutCredit);
        costAppend(checkoutCredit);
        checkoutCredit.append(startOverButton);
        startOverButton.addEventListener("click", () => {
          location.reload();
        });
      }
    });
  }
});
