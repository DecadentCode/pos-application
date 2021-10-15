"use strict";

const cartSection = document.querySelector(".cart-section");
const cartCounter = document.querySelector(".cart-counter");
const ticketSection = document.querySelector(".tickets-section");
const ticketContainers = document.querySelectorAll(".ticket-container");
const clothingList = document.querySelector(".clothing-list");
const collectablesList = document.querySelector(".collectables-list");
const cartContainer = document.querySelector(".cart-container");
const cartList = document.querySelector(".cart-list");
const clothesSection = document.querySelector(".clothes-section");
const collectablesSection = document.querySelector(".collectables-section");
const checkoutContainer = document.querySelector(".checkout-container");
const formContainer = document.querySelector(".form-container");
let totalCounter = 0;

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
    price: 300,
    picture: "assets/hoodie.png",
  },
  {
    name: "Hat",
    category: "clothes",
    description: "hat",
    price: 0.5,
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
    price: 5,
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
    price: 10,
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
  cartArrayFunction();
});

// ---- Hides Checkout ----
cartContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("close-me")) {
    cartContainer.classList.toggle("hide");
  }
});

// ---- Cart Counter Function ----
const displayCartNumber = () => {
  let cartNumber = cartArray.length;
  cartCounter.textContent = cartNumber;
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
  array.forEach((good, index) => {
    const listItem = document.createElement("li");
    const title = document.createElement("h3");
    const image = document.createElement("img");
    const price = document.createElement("p");
    const container = document.createElement("div");
    image.setAttribute("src", good.picture);
    price.textContent = `$${good.price}`;
    listItem.classList.add("list-item");
    container.classList.add("goods-container");
    image.classList.add("goods");
    title.textContent = good.name;
    let form = createForm(index);
    container.append(image);
    container.append(form);
    listItem.append(title, container, price, form);
    destination.append(listItem);
  });
};
goodsFunction(clothesArray, clothingList);
goodsFunction(collectablesArray, collectablesList);

// ---- Not clean! ----
const addSectionListeners = (section, array) => {
  section.addEventListener("click", (e) => {
    const qty = parseInt(e.target.previousSibling.value);
    if (e.target.classList.contains("add-to-cart")) {
      const index = e.target.getAttribute("data-index");
      let product = array[index];
      totalCounter += product.price * qty;
      console.log(totalCounter);
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
    cartArrayFunction();
  });
};
addSectionListeners(ticketSection, ticketsArray);
addSectionListeners(clothesSection, clothesArray);
addSectionListeners(collectablesSection, collectablesArray);

// clothesSection.addEventListener("click", (e) => {
//   const qty = parseInt(e.target.previousSibling.value);
//   if (e.target.classList.contains("add-to-cart")) {
//     const index = e.target.getAttribute("data-index");
//     let product = clothesArray[index];
//     totalCounter += product.price * qty;
//     const newItem = {
//       ...product,
//       qty,
//     };
//     cartArray.push(newItem);
//     displayCartNumber();
//   }
//   cartArrayFunction();
// });

// collectablesSection.addEventListener("click", (e) => {
//   const qty = parseInt(e.target.previousSibling.value);
//   if (e.target.classList.contains("add-to-cart")) {
//     const index = e.target.getAttribute("data-index");
//     let product = collectablesArray[index];
//     totalCounter += product.price * qty;
//     const newItem = {
//       ...product,
//       qty,
//     };
//     cartArray.push(newItem);
//     displayCartNumber();
//   }
//   cartArrayFunction();
// });

const cartArrayFunction = () => {
  cartList.innerHTML = "";
  const checkoutButtonCash = document.createElement("button");
  const checkoutButtonCredit = document.createElement("button");
  const closeButton = document.createElement("p");
  const subtotal = totalCounter;
  const salesTax = totalCounter * 0.06;
  const total = subtotal + salesTax;
  const subtotalListItem = document.createElement("li");
  const salesTaxListItem = document.createElement("li");
  const totalListItem = document.createElement("li");
  checkoutButtonCash.textContent = "Checkout Cash";
  checkoutButtonCash.classList.add("checkout-cash");
  checkoutButtonCredit.textContent = "Checkout Credit";
  checkoutButtonCredit.classList.add("checkout-credit");
  closeButton.textContent = "X";
  closeButton.classList.add("close-me");
  subtotalListItem.textContent = `Subtotal: $${subtotal}`;
  salesTaxListItem.textContent = `Sales Tax $${salesTax}`;
  totalListItem.textContent = `Total $${total}`;
  cartList.append(subtotalListItem, salesTaxListItem, totalListItem);
  cartArray.forEach((item) => {
    const listItem = document.createElement("li");
    const cartItem = document.createElement("p");
    listItem.classList.add("cart-li");
    cartItem.textContent = `${item.qty} x ${item.name} $${item.price}`;
    listItem.prepend(cartItem);
    cartList.prepend(listItem);
  });
  cartList.append(checkoutButtonCash);
  cartList.append(checkoutButtonCredit);
  cartList.append(closeButton);
};

cartContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("checkout-cash")) {
    cartList.classList.add("hide");
    const closeButton = document.createElement("p");
    const cashForm = document.createElement("form");
    const cashLabel = document.createElement("label");
    const cashInput = document.createElement("input");
    const cashButton = document.createElement("button");
    const cashTotal = document.createElement("p");
    closeButton.textContent = "X";
    closeButton.classList.add("close-me");
    cashTotal.textContent = `Total Due: $${totalCounter}`;
    cashForm.append(cashTotal);
    cashLabel.setAttribute("for", "cash");
    cashInput.setAttribute("id", "cash");
    cashInput.setAttribute("name", "cash");
    cashInput.setAttribute("type", "number");
    cashForm.append(cashLabel, cashInput, cashButton);
    cashForm.setAttribute("class", "cash-form");
    cartContainer.append(cashForm);
    cashButton.textContent = "Pay Now";
    cashInput.textContent = "Cash Provided";
    cashLabel.textContent = "Cash Provided";
    cashForm.append(closeButton);
    cashForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const cashGiven = document.getElementById("cash").value;
      const changeDue = cashGiven - totalCounter;
      cashLabel.remove();
      cashInput.remove();
      cashButton.remove();
      cashTotal.remove();
      cashForm.append(`Your change is $${changeDue}`);
    });
  }
});

cartContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("checkout-credit")) {
    cartList.classList.add("hide");
    const closeButton = document.createElement("p");
    const creditForm = document.createElement("form");
    const creditNumberLabel = document.createElement("label");
    const creditDateLabel = document.createElement("label");
    const creditCVVLabel = document.createElement("label");
    const creditNumberInput = document.createElement("input");
    const creditDateInput = document.createElement("input");
    const creditCVVInput = document.createElement("input");
    const creditButton = document.createElement("button");
    const creditTotal = document.createElement("p");
    closeButton.textContent = "X";
    closeButton.classList.add("close-me");
    creditTotal.textContent = `Total Due: $${totalCounter}`;
    creditForm.append(creditTotal);
    creditNumberLabel.setAttribute("for", "creditNumber");
    creditDateLabel.setAttribute("for", "creditDate");
    creditCVVLabel.setAttribute("for", "creditCVV");
    creditInput.setAttribute("id", "credit");
    creditInput.setAttribute("name", "credit");
    creditNumberInput.setAttribute("type", "number");
    creditDateInput.setAttribute("type", "number");
    creditCVVInput.setAttribute("type", "number");
    creditForm.append(creditLabel, creditInput, creditButton);
    creditForm.setAttribute("class", "credit-form");
    cartContainer.append(creditForm);
    creditButton.textContent = "Pay Now";
    creditInput.textContent = "credit Provided";
    creditLabel.textContent = "credit Provided";
    creditForm.append(closeButton);
    creditForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const creditGiven = document.getElementById("credit").value;
      const changeDue = creditGiven - totalCounter;
      creditLabel.remove();
      creditInput.remove();
      creditButton.remove();
      creditTotal.remove();
      creditForm.append(`Your change is $${changeDue}`);
    });
  }
});

// const receipt = receipt.append(cartArray) + receipt.append(totalCounter) + receipt.append(changeDue)

// const checkoutData = {};
// for (let i = 0; i < cartArray.length; i++) {
//   const product = cartArray[i];
//   if (!checkoutData[product.name]) {
//     checkoutData[product.name] = product;
//   } else {
//     checkoutData[product.name].qty += product.qty;
//   }
// }
