import Jsml from "./jsml.js";
let jsml = new Jsml();

let containerItems = document.getElementById('containerItems');
let sidebarElls = Array.from(document.getElementsByClassName('product_type'));

export default function (product, pageType){
    console.log(product)
    jsml.deleteChildren(containerItems)
    sidebarElls.map(el=>{
        el.style.display = 'none';
    })

    if (pageType !== 'drinks'){let sauces = jsml.elementFromHtml(`
    <li class="sidebar_item">
            <img
              class="sidebar_image"
              src="./assets/sidebar_images/koudedrank_sidebar.jpeg"
              alt=""
              id="fries"
            />
            <h3>drinks</h3>
          </li>`)
        document.getElementById('product_typelist').appendChild(sauces)
    }

    jsml.createHTMLElement(`h1`, containerItems, product.name)


}