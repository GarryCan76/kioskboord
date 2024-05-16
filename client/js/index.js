const socket = io();
import Jsml from "./jsml.js";
import addProduct from "./addProduct.js";
const jsml = new Jsml();
let productlist = false;
socket.on("connect", () => {
  document.getElementById("drinks").addEventListener("click", () => {
    page("drinks");
  });
  document.getElementById("beef").addEventListener("click", () => {
    page("beef", "burgers");
  });
  document.getElementById("fish").addEventListener("click", () => {
    page("fish", "burgers");
  });
  document.getElementById("chicken").addEventListener("click", () => {
    page("chicken", "burgers");
  });
  document.getElementById("fries").addEventListener("click", () => {
    page("fries");
  });
  document.getElementById("sauces").addEventListener("click", () => {
    page("sauces");
  });
  socket.on("productsItems", (productItems) => {
    productlist = productItems;
    document.getElementById("fries").click();
    document.getElementById("containerItems").children[0].click();
    // beef = productItems.burgers.beef;
  });
});

function page(pageType, productroot) {
  let products = false;
  if (productroot) {
    products = productlist[productroot][pageType];
  } else {
    products = productlist[pageType];
  }
  jsml.deleteChildren(document.getElementById('containerItems'))
  products.map((product) => {
    let productDiv = jsml.elementFromHtml(`
    <div class="containerItem">
      <img src="${product.image}" alt="product image" class="product_image">
      <p class="product_name">${product.name}</p>
      <p class="product_price">€ ${product.price}</p>
      <p class="product_kcal">${product.Kcal}</p>
    </div>
    `)
    
    document.getElementById('containerItems').appendChild(productDiv)
    productDiv.addEventListener('click', () => {
      addProduct(product, pageType, productlist)
    })
  })
}

