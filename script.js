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
let subtotalCounter = 0;

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
    price: 35,
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

// ----now working ----

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
  subtotalListItem.textContent = `Subtotal: $${subtotal}.00`;
  salesTaxListItem.textContent = `Sales Tax $${salesTax}`;
  totalListItem.textContent = `Total $${total}`;
  cartList.append(subtotalListItem, salesTaxListItem, totalListItem);
  cartArray.forEach((item) => {
    const listItem = document.createElement("li");
    const cartItem = document.createElement("p");
    const removeItem = document.createElement("p");
    removeItem.classList.add("remove-item");
    removeItem.textContent = "Remove Item";
    listItem.classList.add("cart-li");
    cartItem.textContent = `${item.qty} x ${item.name} $${item.price}`;
    listItem.append(removeItem, cartItem);
    cartList.prepend(listItem);
    removeItem.addEventListener("click", () => {
      // left off here...still needs some work
    });
  });
  cartList.append(checkoutButtonCash);
  cartList.append(checkoutButtonCredit);
  cartList.append(closeButton);
};

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

cartContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("checkout-cash")) {
    cartList.classList.add("hide");
    const closeButton = document.createElement("p");
    const cashForm = document.createElement("form");
    const cashLabel = document.createElement("label");
    const cashInput = document.createElement("input");
    const cashButton = document.createElement("button");
    const cashTotal = document.createElement("p");
    const total = totalCounter * 1.06;
    closeButton.textContent = "X";
    closeButton.classList.add("close-me");
    cashTotal.textContent = `Total Due: $${total}`;
    cashLabel.setAttribute("for", "cash");
    cashInput.setAttribute("id", "cash");
    cashInput.setAttribute("name", "cash");
    cashInput.setAttribute("type", "number");
    cashButton.textContent = "Pay Now";
    cashInput.textContent = "Cash Paid";
    cashLabel.textContent = "Cash Paid";
    cashForm.setAttribute("class", "cash-form");
    cashForm.append(closeButton, cashTotal, cashLabel, cashInput, cashButton);
    cartContainer.append(cashForm);
    cashForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const cashGiven = document.getElementById("cash").value;
      const changeDue = cashGiven - total;
      cashLabel.remove();
      cashInput.remove();
      cashButton.remove();
      cashTotal.remove();
      cashForm.append(`Your change is $${changeDue}`);
      cartList.classList.remove("hide");
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
    const total = totalCounter * 1.06;
    closeButton.textContent = "X";
    closeButton.classList.add("close-me");
    creditTotal.textContent = `Total Due: $${total}`;
    creditForm.append(creditTotal);
    creditNumberLabel.setAttribute("for", "credit-number");
    creditNumberLabel.textContent = "Credit Card Number";
    creditNumberInput.setAttribute("id", "credit-number");
    creditNumberInput.setAttribute("name", "credit-number");
    creditNumberInput.setAttribute("type", "text");
    creditNumberInput.placeholder = "Credit card number";
    creditCVVLabel.setAttribute("for", "credit-cvv");
    creditCVVLabel.textContent = "Security Code (CVV)";
    creditCVVInput.setAttribute("name", "credit-cvv");
    creditCVVInput.setAttribute("type", "text");
    creditCVVInput.placeholder = "CVV";
    creditDateLabel.setAttribute("for", "credit-date");
    creditDateLabel.textContent = "Expiration-Date: mm/yy";
    creditDateInput.setAttribute("id", "credit-date");
    creditDateInput.setAttribute("name", "credit-date");
    creditDateInput.setAttribute("type", "number");
    creditDateInput.placeholder = "mm/dd";
    creditButton.textContent = "Pay Now";
    creditForm.setAttribute("class", "credit-form");
    creditForm.append(
      creditNumberLabel,
      creditNumberInput,
      creditDateLabel,
      creditDateInput,
      creditCVVLabel,
      creditCVVInput,
      creditButton,
      closeButton
    );
    cartContainer.append(creditForm);
    creditForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const paid = document.createElement("p");
      paid.textContent = "Paid with Credit Card";
      creditForm.append(paid);
      creditNumberLabel.remove();
      creditNumberInput.remove();
      creditDateLabel.remove();
      creditDateInput.remove();
      creditCVVLabel.remove();
      creditCVVInput.remove();
      creditButton.remove();
      cartList.classList.remove("hide");
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
