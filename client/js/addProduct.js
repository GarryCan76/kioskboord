import Jsml from "./jsml.js";
let jsml = new Jsml();
// https://www.youtube.com/watch?v=-a7a5ZRxhZE
let containerItems = document.getElementById('containerItems');
let sidebarElls = Array.from(document.getElementsByClassName('product_type'));

export default function addProduct (product, pageType, productList, productItemPrev, orderOb){
    console.log(orderOb.products)
    let productItem = null;
    if (productItemPrev){
        productItem = productItemPrev;
    }else {
        productItem = {
            "product":product,
            "pageType": pageType,
            "productList":productList,
            "amount":1,
            "sideProducts":false
        }
    }

    console.log(productItem)
    console.log(product)
    jsml.deleteChildren(containerItems)
    sidebarElls.map(el=>{
        el.style.display = 'none';
    })
    document.getElementById('sidebar').style.display = 'none';
    document.getElementById('subtitle').style.display = 'none';
    document.getElementById('h1').style.display = 'none';
    let stijn = jsml.elementFromHtml(`
<div id="product-prep">
 <link rel="stylesheet" href="./css/productprep.css"/>
    <h2 id="small-name">${product.name}</h2>
    <p id="priceItem">€${product.price}</p>

      <div id="product-attributes">
         <img id="small_img" src="${product.image}" alt="">
      </div>
        <div id="saus_div">
            <p id="big-name">${product.name}</p>
            <img id="big_img" src="${product.image}" alt="">
            <div id="subproducts-choice">
            </div>
        </div>
      <div id="subproducts-buttons">
      </div>
      <div id="plusAndMin">
        <button id="product-minus" class="btn btn-primary">-</button>
        <input id="product-amount" type="number" value="1">
        <button id="product-plus" class="btn btn-primary">+</button>
      </div>
      <div id="buttons_order">
        <button id="cancel" class="btn btn-light">Product annuleren</button> 
        <button id="addto-order" class="btn btn-light">Toevoegen aan bestelling</button>
      </div>
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
    document.getElementById('addto-order').addEventListener('click', ()=>{
        orderOb.products.push(productItem)
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
        const subproductsButtons = document.getElementById('subproducts-choice')

        if (productItem.sideProducts){
            console.log(productItem.sideProducts)
            subproductsChoice.appendChild(jsml.elementFromHtml(`<div><p>${productItem.sideProducts.sauce0}</p><p>${productItem.sideProducts.sauce1}</p></div>`))
        }else {
            productItem['sideProducts'] = {
                'sauce0': 'geen saus',
                'sauce1': 'geen saus'
            }
            subproductsChoice.appendChild(jsml.elementFromHtml(`<div><p>geen saus</p><p>geen saus</p></div>`))
        }



        //buttons
        jsml.createHTMLElement('button', subproductsButtons, 'Wijzigen', {
            'addEventListener': ['click', () => {
                jsml.deleteChildren(document.getElementById('prep-list'))
                let itemIndex = 0;
                document.getElementById('sidebar').style.display = 'block';
                document.getElementById('product-prep').style.display = 'none';
                function listItemEl(type, index){
                    let listItem = document.getElementById('sidebar').appendChild(jsml.elementFromHtml(`
                <div>
                <img class="sidebar_image"/>
                <h3>${productItem.sideProducts[type]}</h3>
                </div>
                `));
                    let li =jsml.createHTMLElement('li', document.getElementById('prep-list'), false, {"classList":"sidebar_item product_type", 'addEventListener':['click', ()=>{

                            displaySauces(productList, productItem, type, index, orderOb, li)
                        }]});
                    if (type.includes(index)){
                        li.click();
                    }
                    li.appendChild(listItem)
                }
                listItemEl('sauce0', 0)
                listItemEl('sauce1', 1)
                displayOverview(productItem)
            }]});
        jsml.createHTMLElement('button', subproductsButtons, 'Wijzigen', {'addEventListener':['click', ()=>{
                jsml.deleteChildren(document.getElementById('prep-list'))

                let itemIndex = 1;
                document.getElementById('sidebar').style.display = 'block';
                document.getElementById('product-prep').style.display = 'none';
                function listItemEl(type, index){
                    let listItem = document.getElementById('sidebar').appendChild(jsml.elementFromHtml(`
                    <div>
                    <img class="sidebar_image"/>
                    <h3>${productItem.sideProducts[type]}</h3>
                    </div>
                    `));
                    let li =jsml.createHTMLElement('li', document.getElementById('prep-list'), false, {"classList":"sidebar_item product_type", 'addEventListener':['click', ()=>{

                        displaySauces(productList, productItem, type, index, orderOb, li)
                        }]});
                    if (type.includes(index)){
                        li.click();
                    }
                    li.appendChild(listItem)
                }
                listItemEl('sauce0', 0)
                listItemEl('sauce1', 1)
                displayOverview(productItem)

        }]});
        function displayOverview(productItem){
            let overLi =jsml.createHTMLElement('li', document.getElementById('prep-list'), false, {"classList":"sidebar_item product_type", 'addEventListener':['click', ()=>{
                    jsml.deleteChildren(document.getElementById('containerItems'));
                    let displayOverview = document.getElementById('containerItems').appendChild(jsml.elementFromHtml(`
                <div>
                <img class="sidebar_image"/>
                <h3>${productItem.sideProducts.sauce0}</h3>
                <h3>${productItem.sideProducts.sauce1}</h3>
                </div>`))
                }]});
            overLi.id = 'overview';
            let Overview = overLi.appendChild(jsml.elementFromHtml(`
                <div>
                <img class="sidebar_image"/>
                <h3>overview</h3>
                </div>`))
        }
    }
}

function displaySauces(productList, productItem, type, itemIndex, orderOb, li){
    //items
    jsml.deleteChildren(document.getElementById('containerItems'))
    console.log(productList)
    let products = productList.sauces;
    products.map((product) => {
        let productDiv = jsml.elementFromHtml(`
    <div class="containerItem">
      <img src="${product.image}" alt="product image" class="product_image">
      <p class="product_name">${product.name}</p>
      <p class="product_price">€ ${product.price}</p>
      <p class="product_kcal">${product.Kcal}</p>
    </div>
    `)

        document.getElementById('containerItems').appendChild(productDiv);
        productDiv.addEventListener('click', () => {
            productItem.sideProducts[type] = product.name;
            li.querySelector('h3').innerHTML = productItem.sideProducts[type];
            if (document.getElementById('prep-list').children[itemIndex + 2]){
                console.log('extra item')

            }else {
                document.getElementById('overview').click();
            }
            
            // addProduct(productItem.product, productItem.pageType, productList, productItem, orderOb)
        });
    });
}