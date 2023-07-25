class Products {
    constructor(id, name, price, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }
}

let menProducts = [
    new Products(1, "Los Angeles Lakers Essential Men's Jordan NBA T-Shirt", 40, '/Images/men1.png'),
    new Products(2, "Los Angeles Lakers Icon Edition 2022/23", 35, '/Images/men2.png'),
    new Products(3, "Nike Dri-FIT Men's Running T-Shirt", 50, '/Images/men3.png'),
    new Products(4, "Rafa Men's Nike Dri-FIT ADV Short-Sleeve Tennis Top", 45, '/Images/men4.png')
]

let womenProducts = [
    new Products(5, "Nike Universa Women's Medium-Support High-Waisted Leggings with Pockets", 60, '/Images/women1.png'),
    new Products(6, "Nike Pro 365 Women's High-Rise 18cm (approx.) Shorts", 45, '/Images/women2.png'),
    new Products(7, "Women's Ribbed Jersey Short-Sleeve Top", 70, '/Images/women3.png'),
    new Products(8, "Women's Gentle-Support High-Waisted 7/8 Leggings", 100, '/Images/women4.png')
]

function renderProducts(nameProducts) {
    let str = '';
    for (let i = 0; i < nameProducts.length; i++) {
        str += `<div class="product">
                    <a class="imgProduct"><img src="${nameProducts[i].image}" alt="error"></a>
                    <div class="descriptionProduct">${nameProducts[i].name}</div>
                    <div class="descriptionProduct"><span>${nameProducts[i].price}</span><label>$</label></div>
                    <button class='addToCart' onclick='addProductToCart(${nameProducts[i].id})'>Add To Cart</button>
                </div>`;
    }
    document.getElementById("listMenProducts").innerHTML = str;
}
renderProducts(menProducts);

let listOrdered = [];
function addProductToCart(id) {
    let addProduct = findProductById(id);

    for (let i = 0; i < listOrdered.length; i++) {
        if (addProduct.id == listOrdered[i].idProduct) {
            alert('The product already exists in your cart');
            return
        }
    }
    // Id tu tang
    let idCart;
    if (listOrdered.length == 0) {
        idCart = 1;
    } else {
        idCart = listOrdered[listOrdered.length - 1].id + 1
    }
    let cart = {
        id: idCart,
        idProduct: addProduct.id,
        name: addProduct.name,
        price: addProduct.price,
        image: addProduct.image,
        quantity: 1,
        total: +addProduct.price * 1
    }
    listOrdered.push(cart);
    renderCart(listOrdered);
}

function findProductById(productId) {
    let newProduct = null;
    for (let i = 0; i < menProducts.length; i++) {
        if (menProducts[i].id == productId) {
            newProduct = menProducts[i];
        }
    }
    //women and kids do the same for loop
    return newProduct;
}

// function totalCart() {
//     let cartItem = document.querySelectorAll('#ordered tr');
//     let total = 0;
//     for (let i = 0; i < cartItem.length; i++) {
//         let priceItem = cartItem[i].querySelector('label').innerHTML;
//         let quantityItem = cartItem[i].querySelector('input').value;
//         total1 = priceItem * quantityItem;
//         total += total1;
//     }
//     document.querySelector('.total span').innerHTML = total;
//     inputchange();
// }

function removeProduct(id) {
    for (let i = 0; i < listOrdered.length; i++) {
        if (listOrdered[i].id == id) {
            listOrdered.splice(i, 1);
        }
    }
    renderCart(listOrdered);
}

function renderCart(listOrdered) {
    let list = '';
    let totalCart = 0;
    for (let i = 0; i < listOrdered.length; i++) {
        totalCart += +listOrdered[i].total;
        list += `<tr>
                    <td style="display: flex; align-items: center;">
                        <img src="${listOrdered[i].image}" style='width: 50px; height: 60px;' alt='error'>
                        <span style='text-align: left; padding-left: 10px'>${listOrdered[i].name}</span>
                    </td>
                    <td><label>${listOrdered[i].price}</label><span>$</span></td>
                    <td><input type="number" onchange='inputchange(${listOrdered[i].id},this.value)' style="width: 40px; text-align: center;" value=${listOrdered[i].quantity}></td>
                    <td style="cursor: pointer; color: red" onclick="removeProduct(${listOrdered[i].id})">Remove</td>
                </tr>`
    }
    document.getElementById('ordered').innerHTML = list;
    document.querySelector('.total span').innerHTML = totalCart;
    // totalCart();
    // inputchange();
}

function inputchange(id, value) {
    console.log(listOrdered);
    // let cartItem = document.querySelectorAll('#ordered tr');
    // for (let i = 0; i < cartItem.length; i++) {
    //     let inputValue = cartItem[i].querySelector('input');
    //     // cartItem[i].quantityItem = inputValue;
    //     inputValue.addEventListener('change', function (event){
    //         totalCart();
    //     })
    // }
    for (let i = 0; i < listOrdered.length; i++) {
        // totalOrder = 0
        if (listOrdered[i].id == id) {
            listOrdered[i].quantity = value;
            listOrdered[i].total = listOrdered[i].quantity * listOrdered[i].price
        }
    }
    renderCart(listOrdered)
}

const cartButton = document.querySelector('.fa-bag-shopping');
const closeButton = document.querySelector('.fa-x');
cartButton.addEventListener('click', function(){
    document.querySelector('#cart').style.right = '0'
    console.log(cartButton);
})
closeButton.addEventListener('click', function(){
    document.querySelector('#cart').style.right = '100%'
    console.log(closeButton);
})
