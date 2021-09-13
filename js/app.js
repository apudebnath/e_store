const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <p><span class="textColor">Average <i class="fas fa-star"></i> ${product.rating.rate}</span> | <span class="countColor"><i class="fas fa-users"></i> ${product.rating.count}</span></p>
        <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn cart-btn">add to cart</button>
      <button onclick="addDetails(${product.id})" id="details-btn" class="btn details-color">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

// show single Product Details
const addDetails = (id) => {
    const url = `https://fakestoreapi.com/products/${id}`;
    fetch(url)
    .then((response) => response.json())
    .then((data) => showProductDetails(data))

  const showProductDetails = (product) => {
    console.log(product);
    const productDetails = document.getElementById('productDetails');
    productDetails.innerHTML = `
      <div class='single-productDetails w-50 mx-auto p-5 mb-5 d-flex justify-content-between text-white'>
      <div class="align-middle">
        <img class="product-image" src="${product.image}">
      </div>
      <div class="ps-3">
        <h3 class="mt-0">${product.title}</h3>
        <p><span class="text-info">Average <i class="fas fa-star"></i> ${product.rating.rate}</span> | <span class="text-warning"><i class="fas fa-users"></i> ${product.rating.count}</span></p>
        <p>Category: ${product.category}</p>
        <p><span class="fw-bold">Product Details: </span>${product.description}</p>
      </div>
      </div>
    `;
  }
};
// cart
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  // const converted = parseInt(element);
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  // document.getElementById(id).innerText = Math.round(total);
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  //document.getElementById(id).innerText = Math.round(value);
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

