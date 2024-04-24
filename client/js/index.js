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
  socket.on("productsItems", (productItems) => {
    productlist = productItems;
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
  
  products.map((product) => {
    console.log(product);
    // products.map(product, () => {
    //     jsml.createHTMLElement('img', document.getElementById('containerItems'), false, {'src':beefBurger.image, "classList": 'item_image'})
    //     jsml.createHTMLElement('p', document.getElementById('containerItems'), beefBurger.name, {"classList":"item_product_name"})
    //     jsml.createHTMLElement('p', document.getElementById('containerItems'), beefBurger.Kcal, {"classList":"item_kcal"})
    //     jsml.createHTMLElement('p', document.getElementById('containerItems'), '€' + beefBurger.price,  {"classList":"item_price"})
    // })
  });
}
