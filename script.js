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
const subtotalP = document.querySelector(".subtotal-p");
const salesTaxP = document.querySelector(".sales-tax-p");
const totalP = document.querySelector(".total-p");
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

// ---- Not updated ----
ticketSection.addEventListener("click", (e) => {
  const qty = parseInt(e.target.previousSibling.value);
  if (e.target.classList.contains("add-to-cart")) {
    const index = e.target.getAttribute("data-index");
    let product = ticketsArray[index];
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

clothesSection.addEventListener("click", (e) => {
  const qty = parseInt(e.target.previousSibling.value);
  if (e.target.classList.contains("add-to-cart")) {
    const index = e.target.getAttribute("data-index");
    let product = clothesArray[index];
    totalCounter += product.price * qty;
    const newItem = {
      ...product,
      qty,
    };
    cartArray.push(newItem);
    displayCartNumber();
  }
  cartArrayFunction();
});

collectablesSection.addEventListener("click", (e) => {
  const qty = parseInt(e.target.previousSibling.value);
  if (e.target.classList.contains("add-to-cart")) {
    const index = e.target.getAttribute("data-index");
    let product = collectablesArray[index];
    totalCounter += product.price * qty;
    const newItem = {
      ...product,
      qty,
    };
    cartArray.push(newItem);
    displayCartNumber();
  }
  cartArrayFunction();
});

const cartArrayFunction = () => {
  cartList.innerHTML = "";
  const checkoutButton = document.createElement("button");
  const closeButton = document.createElement("p");
  checkoutButton.textContent = "Checkout";
  checkoutButton.classList.add("checkout");
  closeButton.textContent = "X";
  closeButton.classList.add("close-me");
  cartList.append(checkoutButton);
  cartList.append(closeButton);
  cartArray.forEach((item) => {
    const listItem = document.createElement("li");
    const cartItem = document.createElement("p");
    listItem.classList.add("cart-li");
    cartItem.textContent = `${item.qty} x ${item.name} $${item.price}`;
    listItem.append(cartItem);
    cartList.append(listItem);
  });
};

cartContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("checkout")) {
    cartList.innerHTML = "";
    cartArrayFunction();
    const subtotal = totalCounter;
    const salesTax = totalCounter * 0.06;
    const total = subtotal + salesTax;
    const subtotalListItem = document.createElement("li");
    const salesTaxListItem = document.createElement("li");
    const totalListItem = document.createElement("li");
    subtotalListItem.textContent = `Subtotal: $${subtotal}`;
    salesTaxListItem.textContent = `Sales Tax $${salesTax}`;
    totalListItem.textContent = `Total $${total}`;
    cartList.append(subtotalListItem, salesTaxListItem, totalListItem);
    console.log(total);
  }
});

// const checkoutData = {};
// for (let i = 0; i < cartArray.length; i++) {
//   const product = cartArray[i];
//   if (!checkoutData[product.name]) {
//     checkoutData[product.name] = product;
//   } else {
//     checkoutData[product.name].qty += product.qty;
//   }
// }
