"use strict";

const clothingList = document.querySelector(".clothing-list");
const collectablesList = document.querySelector(".collectables-list");

const ticketsArray = [
  {
    name: "General Admission",
    category: "ticket",
    price: 40,
  },
  {
    name: "Medium Admission",
    category: "ticket",
    price: 100,
  },
  {
    name: "Grande Admission",
    category: "ticket",
    price: 10000,
  },
];

const goodsArray = [
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

const ticketContainers = document.querySelectorAll(".ticket-container");

const ticketForms = () => {
  ticketContainers.forEach((item) => {
    const form = document.createElement("form");
    const label = document.createElement("label");
    const input = document.createElement("input");
    const button = document.createElement("button");
    button.textContent = "Add to cart";
    label.textContent = "qty.";
    label.setAttribute("for", "qty");
    input.setAttribute("id", "qty");
    input.setAttribute("name", "qty");
    input.setAttribute("type", "number");
    form.append(label, input, button);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      form.reset();
    });
    item.append(form);
  });
};

const goodsFunction = (array, destination) => {
  array.forEach((item) => {
    const listItem = document.createElement("li");
    const title = document.createElement("h3");
    const image = document.createElement("img");
    const price = document.createElement("p");
    const container = document.createElement("div");
    const form = document.createElement("form");
    const label = document.createElement("label");
    const input = document.createElement("input");
    const button = document.createElement("button");
    image.setAttribute("src", item.picture);
    price.textContent = `$${item.price}`;
    listItem.classList.add("list-item");
    container.classList.add("goods-container");
    image.classList.add("goods");
    title.textContent = item.name;
    button.textContent = "Add to cart";
    label.textContent = "qty.";
    label.setAttribute("for", "qty");
    input.setAttribute("id", "qty");
    input.setAttribute("name", "qty");
    input.setAttribute("type", "number");
    form.append(label, input, button);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      form.reset();
    });
    container.append(image);
    listItem.append(title, container, price, form);
    destination.append(listItem);
  });
};

goodsFunction(goodsArray, clothingList);
goodsFunction(collectablesArray, collectablesList);
ticketForms();
