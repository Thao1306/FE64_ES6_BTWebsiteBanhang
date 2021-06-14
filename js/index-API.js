import { Product } from "../models/Product.js";

//GET PRODUCTLIST
const getProduct = () => {
  axios({
    url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
    method: "GET",
  })
    .then((result) => {
      let productList = mapProducts(result.data);
      renderProduct(productList);
    })
    .catch((error) => {
      console.log(error);
    });
};
getProduct();
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
          <div style='height: 350px'>
            <p>name: ${name}</p>
            <p>price: ${price}</p>
            <p>screen: ${screen}</p>
            <p>backCamera: ${backCamera}</p>
            <p>frontCamera: ${frontCamera}</p>
            <p>desc: ${desc}</p>
            <p>fontCamera: ${fontCamera}</p>
            <p>rating: ${rating}</p>
          </div>
        </div>
      </div>
      `;
  }
  document.querySelector("#productList").innerHTML = content;
};

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
      fontCamera,
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
      fontCamera
    );
  });
  return productmapped;
};
//GET PRODUCT
document.getElementById("btnGetProd").onclick = async () => {
  let idProd = document.querySelector("#idProdGet").value;
  await axios({
    url: `https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/${idProd}`,
    method: "GET",
  })
    .then((result) => {
      console.log(result.data);
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
      } = result.data;
      document.getElementById("id").value = id;
      document.getElementById("name").value = name;
      document.getElementById("price").value = price;
      document.getElementById("screen").value = screen;
      document.getElementById("backCamera").value = backCamera;
      document.getElementById("frontCamera").value = frontCamera;
      document.getElementById("img").value = img;
      document.getElementById("desc").value = desc;
      document.getElementById("type").value = type;
      document.getElementById("image").value = image;
      document.getElementById("inventory").value = inventory;
      document.getElementById("rating").value = rating;
    })
    .catch((error) => {
      console.log(error);
    });
};

//PUT PRODUCT
document.getElementById("updateProd").onclick = async () => {
  let product = new Product();

  product.id = document.getElementById("id").value;
  product.name = document.getElementById("name").value;
  product.price = document.getElementById("price").value;
  product.screen = document.getElementById("screen").value;
  product.backCamera = document.getElementById("backCamera").value;
  product.frontCamera = document.getElementById("frontCamera").value;
  product.img = document.getElementById("img").value;
  product.desc = document.getElementById("desc").value;
  product.type = document.getElementById("type").value;
  product.image = document.getElementById("image").value;
  product.inventory = document.getElementById("inventory").value;
  product.rating = document.getElementById("rating").value;

  await axios({
    url: `https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/${product.id}`,
    method: "PUT",
    data: product,
  })
    .then((result) => {
      alert(`Cập nhật thông tin sản phẩm ID${result.data.id} thành công`);
      getProduct()
    })
    .catch((error) => {
      console.log(error);
    });
};

//POST
document.getElementById("btnAdd").onclick = () => {
  let newProd = new Product();

  newProd.id = document.getElementById("newId").value;
  newProd.name = document.getElementById("newName").value;
  newProd.price = document.getElementById("newPrice").value;
  newProd.screen = document.getElementById("newScreen").value;
  newProd.backCamera = document.getElementById("newBackCamera").value;
  newProd.frontCamera = document.getElementById("newFrontCamera").value;
  newProd.img = document.getElementById("newImg").value;
  newProd.desc = document.getElementById("newDesc").value;
  newProd.type = document.getElementById("newType").value;
  newProd.image = document.getElementById("newImage").value;
  newProd.inventory = document.getElementById("newInventory").value;
  newProd.rating = document.getElementById("newRating").value;
  console.log(newProd);

  axios({
    url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
    method: "POST",
    data: newProd,
  })
    .then(() => {
      alert(`Thêm sản phẩm thành công`)
      getProduct()
    })
    .catch((error) => {
      console.log(error);
    });
};

//DELETE
document.getElementById('btnDelete').onclick = () => {
  let id = document.getElementById('id').value;
  axios({
    url: `https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/${id}`,
    method: 'DELETE',
  }).then(() => {
    alert(`Xóa sản phẩm ID${id}thành công`)
    getProduct()
  }).catch((error) => {
    console.log(error);
  })
}
