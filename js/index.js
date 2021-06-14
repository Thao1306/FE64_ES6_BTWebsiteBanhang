import { Product } from "../models/Product.js";

//Get/render Product
let productList = [];
let cartItem = [];
let cart = [];
let content2 = "";
async function list() {
  await axios({
    url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
    method: "GET",
  })
    .then(function (result) {
      productList = mapProducts(result.data);
      renderProduct(productList);
    })
    .catch(function (errors) {
      console.log(errors);
    });
}
list();
const mapProducts = (data) => {
  const productmapped = data.map((item) => {
    const {
      id,
      name,
      price,
      screen,
      backCamera,
      frontCamera,
      img,
      desc,
      type,
      image,
      inventory,
      rating,
    } = item;
    return new Product(
      id,
      name,
      price,
      screen,
      backCamera,
      frontCamera,
      img,
      desc,
      type,
      image,
      inventory,
      rating,
    );
  });
  return productmapped;
};
const renderProduct = (productList) => {
  let content = "";
  for (let item of productList) {
    let {
      id,
      name,
      price,
      screen,
      backCamera,
      frontCamera,
      img,
      desc,
      type,
      image,
      inventory,
      rating,
      fontCamera,
    } = item;
    content += `
    <div class='col-md-4'>
      <div class= 'border p-3 mb-3'>
        <img src=${image} alt='Điện thoại' style='width: 300px;height: 300px'>
        <div style='height: 376px'>
          <p>name: ${name}</p>
          <p>price: ${price}</p>
          <p>screen: ${screen}</p>
          <p>backCamera: ${backCamera}</p>
          <p>frontCamera: ${frontCamera}</p>
          <p>desc: ${desc}</p>
          <p>fontCamera: ${fontCamera}</p>
          <p>rating: ${rating}</p>
        </div>
        <button class="btn btn-success btn-block" onclick="addToCart('${id}')">Add to cart</button>
      </div>
    </div>
    `;
  }
  document.querySelector("#content").innerHTML = content;
};
//Fillter product
document.getElementById("filterProducts").onchange = function filterProduct() {
  let productFilter = [];
  let product = document.querySelector("#filterProducts").value;
  if (product === "sp") {
    productFilter = productList;
  }
  if (product === "samsung") {
    for (let item of productList) {
      if (item.type.toLowerCase() === "samsung") {
        productFilter.push(item);
      }
    }
  }
  if (product === "iphone") {
    for (let item of productList) {
      if (item.type.toLowerCase() === "iphone") {
        productFilter.push(item);
      }
    }
  }
  return renderProduct(productFilter);
};
//Add to cart
const addToCart = (id) => {
  for (let item of productList) {
    if (id === item.id) {
      cartItem = { product: item, quantity: 1 };
      pushCart();
      renderCart();
    }
  }
  // pushCart();
};
//Check to adding to cart
const pushCart = () => {
  if (cart.length === 0) {
    cart.push(cartItem);
  } else {
    for (let item of cart) {
      if (item.product.id === cartItem.product.id) {
        item.quantity += 1;
        return cart;
      }
    }
    cart.push(cartItem);
    return cart;
  }
};

//Render cart
const renderCart = () => {
  let content1 = "";
  let tongTien = 0;
  for (let item of cart) {
    const { id, name, image, price } = item.product;
    tongTien += price * item.quantity;
    content1 += `
    <tr>
      <td class='w-25'>
      <img src='${image}' alt='${name}' class='w-25'>
      </td>
      <td>${name}</td>
      <td>${price}</td>
      <td>
      <span>${item.quantity}</span>
      <button class='btn btn-info' onclick="increaseProd('${id}')">+</button>
      <button class='btn btn-info' onclick="decreaseProd('${id}')">-</button>
      </td>
      <td>${price * item.quantity}</td>
      <td><button class='btn btn-info' onclick="deleteProd('${id}')">x</button></td>
    </tr>
    `;
  }
  content2 = `
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td>Tổng tiền</td>
    <td>${tongTien}</td>
    <td>
      <button class='btn btn-info' onclick="clearCart()">Thanh toán</button>
      <button class='btn btn-info' onclick="saveLocalStorage()">Xác nhận giỏ hàng</button>
    </td>
  </tr>
`;
  document.getElementById("detailItem").innerHTML = content1 + content2;
};

//Button incerase/decrease/delete trong cart
const increaseProd = (id) => {
  const increaseItem = cart.find((item) => {
    return id === item.product.id;
  });
  increaseItem.quantity++;
  renderCart();
};
const decreaseProd = (id) => {
  const index = cart.findIndex((item) => {
    return id === item.product.id;
  });
  if (cart[index].quantity === 1) {
    cart.splice(index, 1);
    console.log(cart);
  } else {
    cart[index].quantity--;
  }
  renderCart();
};
const deleteProd = (id) => {
  const index = cart.findIndex((item) => {
    return id === item.product.id;
  });
  cart.splice(index, 1);
  renderCart();
};
const clearCart = () => {
  cart = [];
  saveLocalStorage();
  renderCart();
};

//Save/get on localStorage
const saveLocalStorage = () => {
  let sCart = JSON.stringify(cart);
  localStorage.setItem("sCart", sCart);
};

const getLocalStorage = () => {
  cart = JSON.parse(localStorage.getItem("sCart"));
  renderCart();
};

getLocalStorage();

//------------------------------------------

window.addToCart = addToCart;
window.increaseProd = increaseProd;
window.decreaseProd = decreaseProd;
window.deleteProd = deleteProd;
window.clearCart = clearCart;
window.saveLocalStorage = saveLocalStorage;