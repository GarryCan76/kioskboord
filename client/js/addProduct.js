import Jsml from "./jsml.js";
let jsml = new Jsml();
// https://www.youtube.com/watch?v=-a7a5ZRxhZE
let containerItems = document.getElementById('containerItems');
let sidebarElls = Array.from(document.getElementsByClassName('product_type'));

export default function (product, pageType){
    let productItem = {
        "amount":1
    }
    console.log(product)
    jsml.deleteChildren(containerItems)
    sidebarElls.map(el=>{
        el.style.display = 'none';
    })
    document.getElementById('sidebar').style.display = 'none';

    // if (pageType !== 'drinks'){let sauces = jsml.elementFromHtml(`
    // <li class="sidebar_item">
    //         <img
    //           class="sidebar_image"
    //           src="./assets/sidebar_images/koudedrank_sidebar.jpeg"
    //           alt=""
    //           id="fries"
    //         />
    //         <h3>drinks</h3>
    //       </li>`)
    //     document.getElementById('product_typelist').appendChild(sauces)
    // }


    let stijn = jsml.elementFromHtml(`
<div id="product-prep">
  <link rel="stylesheet" href="./css/productprep.css"/>
  <img src="${product.image}" alt="">
  <div id="product-attributes">
    <p id="small-name">${product.name}</p>
    <img id="small-img" src="${product.image}" alt="">
    <div id="subproducts-choice">
    </div>
  </div>
  <div id="subproducts-buttons">
  </div>
  <div>
    <button id="product-minus">-</button>
    <input id="product-amount" type="number" value="1">
    <button id="product-plus">+</button>
  </div>
  <button id="cancel">Product annuleren</button>
  <button id="addto-order">Toevoegen aan bestelling</button>
</div>
`)
    document.getElementById('containerItems').appendChild(stijn)

    //product amount
    let productAmountInput = document.getElementById('product-amount')
    document.getElementById('product-minus').addEventListener('click', ()=>{
        if (productItem.amount > 1){
            productItem.amount--
            productAmountInput.value = productItem.amount;
        }

    })
    let maxProducts = 50;
    document.getElementById('product-plus').addEventListener('click', ()=>{
        if (productItem.amount >= maxProducts){
            productItem.amount = maxProducts;
        }else {
            productItem.amount++
            productAmountInput.value = productItem.amount;
        }
r
    })
    productAmountInput.addEventListener('input', ()=>{
        productItem.amount = parseInt(productAmountInput.value);
        if (productItem.amount >= maxProducts){
            productAmountInput.value = maxProducts;
        }
    })


    document.getElementById('cancel').addEventListener('click', ()=>{
        jsml.deleteChildren(containerItems)
        sidebarElls.map(el=>{
            el.style.display = 'flex';
        })
        document.getElementById('sidebar').style.display = 'flex';
        document.getElementById("drinks").click()
    })


    // sub products
    if (pageType === 'fries'){
        const subproductsChoice = document.getElementById('subproducts-choice')
        const subproductsButtons = document.getElementById('subproducts-buttons')

        subproductsChoice.appendChild(jsml.elementFromHtml(`<div><p>geen saus</p><p>geen saus</p></div>`))
        productItem['sauce1'] = 'geen saus';
        productItem['sauce2'] = 'geen saus';
        //buttons
        jsml.createHTMLElement('button', subproductsButtons, 'Wijzigen', {'addEventListener':['click', ()=>{

                document.getElementById('sidebar').style.display = 'block';
                document.getElementById('product-prep').style.display = 'none';
                document.getElementById('sidebar').appendChild(jsml.elementFromHtml(`
                <ul>
                <li class="sidebar_item product_type">
            <img
              class="sidebar_image"
            />
            <h3>saus</h3>
          </li>
                </ul>
                `))
            }]})
        jsml.createHTMLElement('button', subproductsButtons, 'Wijzigen', {'addEventListener':['click', ()=>{
                console.log('1')
            }]})
    }
}
