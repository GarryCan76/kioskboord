const socket = io();

import orderObject from "./oderObject.js"
let orderOb = new orderObject();
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
  socket.on("productsItems", (productItems) => {
    productlist = productItems;
    document.getElementById("fries").click();
    document.getElementById("containerItems").children[0].click();
    document.getElementById("addto-order").click();

    // beef = productItems.burgers.beef;
  });
});

function page(pageType, productroot) {
  let products = false;
  console.log(orderOb.products)
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
      addProduct(product, pageType, productlist, false, orderOb)
    })
  })
}

jsml.createHTMLElement('button', document.getElementById('order-display'), 'complete order', {"id":"seeOrder", "addEventListener":['click', ()=>{
    let sidebarElls = Array.from(document.getElementsByClassName('product_type'));
    let containerItems = document.getElementById('containerItems');
    containerItems.classList.add('complete-order')
    jsml.deleteChildren(containerItems)


    sidebarElls.map(el=>{
      el.style.display = 'none';
    });
    jsml.deleteChildren(containerItems)
    document.getElementById('sidebar').style.display = 'none';
    document.getElementById('subtitle').style.display = 'none';
    document.getElementById('h1').style.display = 'none';




    let orderContainer = jsml.createHTMLElement('div', containerItems);
    orderContainer.classList.add('orderContainer')

    orderOb.products.map(productData=>{
        let product = productData.product
        let productItem = jsml.elementFromHtml(`
        <div class="product-item">
        <p>${productData.amount + " X " + product.name}</p>
        
        </div>`)
        orderContainer.appendChild(productItem)

    });





    containerItems.appendChild(jsml.elementFromHtml(`
    <button id="back" class="btn btn-light">Terug</button>
    `));
    document.getElementById('back').addEventListener('click', ()=>{
        jsml.deleteChildren(containerItems)
        sidebarElls.map(el=>{
            el.style.display = 'flex';
        })
        containerItems.classList.remove('complete-order')
        document.getElementById('sidebar').style.display = 'flex';
        document.getElementById("drinks").click()
    });
}]});