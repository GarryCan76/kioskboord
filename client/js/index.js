const socket = io();
import Jsml from "./jsml.js";
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
    document.getElementById("drinks").click();
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
      <img src="${product.image}" alt="product image" class="product_image"></img>
      <p class="product_name">${product.name}</p>
      <p class="product_price">€ ${product.price}</p>
      <p class="product_kcal">${product.Kcal}</p>
    </div>
    `)
    
    document.getElementById('containerItems').appendChild(productDiv)
    productDiv.addEventListener('click', () => {
      console.log('clicked')
    })
  })


  // products.map((product) => {
  //   console.log(product);
  //       jsml.createHTMLElement('img', document.getElementById('containerItems'), false, {'src':product.image, "classList": 'item_image'})
  //       jsml.createHTMLElement('p', document.getElementById('containerItems'), product.name, {"classList":"item_product_name"})
  //       jsml.createHTMLElement('p', document.getElementById('containerItems'), product.Kcal, {"classList":"item_kcal"})
  //       jsml.createHTMLElement('p', document.getElementById('containerItems'), '€' + product.price,  {"classList":"item_price"})
  // });
}

